import express from 'express';

import PointsController from '../controllers/PointsController';

const pointsController = new PointsController();
const routes = express.Router();

routes.get("/points", pointsController.index);
routes.get("/points/:id", pointsController.show);
routes.post("/points", pointsController.create);

export default routes;
