import { Router } from 'express';
import { TaskController } from '../controllers/TaskController';

const taskRoutes = Router();
const controller = new TaskController();

taskRoutes.post('/', controller.create);
taskRoutes.get('/', controller.list);
taskRoutes.get('/:id', controller.getById);
taskRoutes.put('/:id', controller.update);
taskRoutes.delete('/:id', controller.remove);

export { taskRoutes };
