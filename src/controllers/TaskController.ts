import { Request, Response } from 'express';
import { TaskService } from '../services/TaskService';

class TaskController {
  async create(req: Request, res: Response) {
    try {
      const { title } = req.body;
      const service = new TaskService();
      const task = await service.create(title);
      return res.status(201).json(task);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  async list(req: Request, res: Response) {
    const { completed } = req.query;
    const service = new TaskService();

    let filtro: boolean | undefined;
    if (completed === 'true') filtro = true;
    if (completed === 'false') filtro = false;

    const tasks = await service.getAll(filtro);
    return res.status(200).json(tasks);
  }

  async getById(req: Request, res: Response) {
    const id = Number(req.params.id);
    const service = new TaskService();
    const task = await service.getById(id);

    if (!task) {
      return res.status(404).json({ error: 'Tarefa não encontrada' });
    }

    return res.status(200).json(task);
  }

  async update(req: Request, res: Response) {
    const id = Number(req.params.id);
    const { title, completed } = req.body;
    const service = new TaskService();
    const task = await service.update(id, { title, completed });

    if (!task) {
      return res.status(404).json({ error: 'Tarefa não encontrada' });
    }

    return res.status(200).json(task);
  }

  async remove(req: Request, res: Response) {
    const id = Number(req.params.id);
    const service = new TaskService();
    const deleted = await service.delete(id);

    if (!deleted) {
      return res.status(404).json({ error: 'Tarefa não encontrada' });
    }

    return res.status(204).send();
  }
}

export { TaskController };