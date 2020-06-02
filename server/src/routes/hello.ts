import express from 'express';

const routes = express.Router();

routes.get("/", (_, res) => res.json({ msg: "Hello Rocket" }));

export default routes;
