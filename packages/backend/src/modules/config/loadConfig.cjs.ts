import fs =  require('fs');
import path = require('path');
import dotenv = require('dotenv');


module.exports = function loadConfig(_cwd?: string) {
  const cwd = _cwd || process.cwd();
  const NODE_ENV = process.env.NODE_ENV;

  if (!NODE_ENV) {
    throw new Error('Environment variable `NODE_ENV` not set.');
  }

  let configPath = path.join(cwd, '.env');

  if (!fs.existsSync(configPath)) {
    if (['development', 'test'].includes(NODE_ENV)) {
      configPath = path.join(cwd, `.env.${NODE_ENV}`);

      if (!fs.existsSync(configPath)) {
        throw new Error('Missing config file.');
      }
    } else {
      throw new Error('Missing config file.');
    }
  }

  dotenv.config({ path: configPath });
};
