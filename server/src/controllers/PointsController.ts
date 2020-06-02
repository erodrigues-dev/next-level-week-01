import { NextFunction, Request, Response } from 'express';

import knex from '../database/connection';

export default class PointsController {
  async create(req: Request, res: Response, next: NextFunction) {
    const {
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      items,
    } = req.body;

    const trx = await knex.transaction();
    try {
      const point = {
        name,
        email,
        whatsapp,
        latitude,
        longitude,
        city,
        uf,
        image:
          "https://images.unsplash.com/photo-1542739674-b449a8938b59?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=70",
      };
      const [id] = await trx("points").insert(point);
      const serializedItems = items.map((itemId: number) => ({
        point_id: id,
        item_id: itemId,
      }));
      await trx("point_items").insert(serializedItems);
      await trx.commit();
      return res.json({
        id,
        ...point,
      });
    } catch (error) {
      await trx.rollback();
      next(error);
    }
  }

  async show(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    try {
      const point = await knex("points").where("id", id).first();

      if (!point) return res.status(400).json({ message: "point not found" });

      const items = await knex("items")
        .join("point_items", "items.id", "=", "point_items.item_id")
        .where("point_items.point_id", id)
        .select("items.title");

      return res.json({ ...point, items });
    } catch (error) {
      next(error);
    }
  }

  async index(req: Request, res: Response, next: NextFunction) {
    try {
      const { city, uf, items } = req.query;
      const parsedItems = String(items)
        .split(",")
        .map((item) => Number(item.trim()))
        .filter((item) => !isNaN(item));

      const list = await knex("points")
        .join("point_items", "points.id", "=", "point_items.point_id")
        .whereIn("point_items.item_id", parsedItems)
        .where("city", String(city))
        .where("uf", String(uf))
        .distinct()
        .select("points.*")
        .orderBy("name");

      return res.json(list);
    } catch (error) {
      next(error);
    }
  }
}
