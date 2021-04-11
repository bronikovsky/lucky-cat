import { Model } from 'objection';
import express, { Request, Response, Router } from 'express';
import setApplicationJsonResponseHeader from './setApplicationJsonResponseHeader';

export default function setBasicGetHandlers(model: typeof Model): Router {
  const router = express.Router();

  router.use(setApplicationJsonResponseHeader());

  router.get('/', async (req: Request, res: Response) => {
    res.send(await model.query());
  });

  router.get('/:id', async (req: Request, res: Response) => {
    const entity = await model.query().findById(req.params.id);

    if (!entity) {
      res.status(404);

      return res.send();
    }

    return res.send(entity);
  });

  return router;
}
