import { Request, Response } from 'express';
import Service from '../models/Service';

export const createService = async (req: Request, res: Response) => {
  const { name, description, category, price } = req.body;

  try {
    const service = new Service({ name, description, category, price, providerId: req.user.id });
    await service.save();

    res.status(201).json(service);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create service' });
  }
};

export const getServices = async (_req: Request, res: Response) => {
  try {
    const services = await Service.find();
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch services' });
  }
};

