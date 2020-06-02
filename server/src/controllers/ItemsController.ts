import { Request, Response } from 'express';

import knex from '../database/connection';

export default class ItemsController {
  async index(req: Request, res: Response) {
    const items = await knex("items").orderBy("title").select("*");

    const serialized = items.map((item) => ({
      id: item.id,
      title: item.title,
      image_url: `http://localhost:3333/uploads/${item.image}`,
    }));

    return res.json(serialized);
  }
}
