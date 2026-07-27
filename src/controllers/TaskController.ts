import { Request, Response } from 'express';
import { TaskService } from '../services/TaskService';

class TaskController {
  create(req: Request, res: Response) {
    try {
      const { title } = req.body;
      const service = new TaskService();
      const task = service.create({ title });
      return res.status(201).json(task);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  list(req: Request, res: Response) {
    const { completed } = req.query;
    const service = new TaskService();

    let filtro: boolean | undefined;
    if (completed === 'true') filtro = true;
    if (completed === 'false') filtro = false;

    const tasks = service.list(filtro);
    return res.status(200).json(tasks);
  }

  getById(req: Request, res: Response) {
    const { id } = req.params as { id: string };
    const service = new TaskService();
    const task = service.findById(id);

    if (!task) {
      return res.status(404).json({ error: 'Tarefa não encontrada' });
    }

    return res.status(200).json(task);
  }

  update(req: Request, res: Response) {
    const { id } = req.params as { id: string };
    const { title, completed } = req.body;
    const service = new TaskService();
    const task = service.update(id, { title, completed });

    if (!task) {
      return res.status(404).json({ error: 'Tarefa não encontrada' });
    }

    return res.status(200).json(task);
  }

  remove(req: Request, res: Response) {
    const { id } = req.params as { id: string };
    const service = new TaskService();
    const deleted = service.delete(id);

    if (!deleted) {
      return res.status(404).json({ error: 'Tarefa não encontrada' });
    }

    return res.status(204).send();
  }
}

export { TaskController };