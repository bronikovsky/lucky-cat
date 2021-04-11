import { router as authRouter, User } from './modules/auth';
import { config } from './modules/database';
import { loadConfig } from './modules/config';
import { Strategy as LocalStrategy } from 'passport-local';
import { Model } from 'objection';
import { router as uploadRouter } from './modules/upload';
import bcryptjs from 'bcryptjs';
import express from 'express';
import knex from 'knex';
import passport from 'passport';

async function main() {
  loadConfig();

  const DB_MAX_RETRIES = 5;

  const db = knex(config);

  if (process.env.NODE_ENV === 'production' || process.env.DB_AUTO_SYNC) {
    let connected = false;
    let retries = 0;

    // Test db connection
    while (!connected) {
      try {
        await db.raw('select 1+1 as result');
        connected = true;
      } catch (e) {
        if (e.errno === 'ECONNREFUSED') {
          console.log(e);
          console.log('Database unavailable. Retrying...');

          if (retries >= DB_MAX_RETRIES) {
            console.log('Unable to connect to database.');

            // eslint-disable-next-line no-process-exit
            process.exit(1);
          }

          retries++;
          await new Promise(resolve => setTimeout(resolve, 1000));
        } else {
          throw e;
        }
      }
    }

    await db.migrate.latest();
    await db.seed.run();
  }

  const app = express();

  Model.knex(knex);

  passport.use(new LocalStrategy(async (phoneNumber, password, done) => {
    const user = await User.query().findById(1);

    if (!user || !bcryptjs.compareSync(password, user.password)) {
      return done(null, false, { message: 'invalid_credentials' });
    }

    return done(null, user);
  }));

  passport.serializeUser((user, done) => {
    done(null, (user as User).id);
  });

  passport.deserializeUser(async (id: number, done) => {
    const user = await User.query().findById(id);
    done(null, user);
  });

  app.use(passport.initialize());
  app.use(passport.session());

  const api = express();

  api.use('/auth', authRouter);
  api.use('/upload', uploadRouter);

  app.use('/api', api);

  const port = 5000;

  app.listen(port, () => {
    console.log(`Started WebAPI on port ${port}.`);
  })
}

main();
