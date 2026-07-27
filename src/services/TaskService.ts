import { randomUUID } from 'node:crypto';
import { Task } from '../models/Task';

// Em memória — os dados somem quando o servidor reinicia (esperado nesta semana)
const tasks: Task[] = [];

interface ICreateTask {
  title: string;
}

interface IUpdateTask {
  title?: string;
  completed?: boolean;
}

class TaskService {
  create({ title }: ICreateTask): Task {
    if (!title) {
      throw new Error('O título é obrigatório');
    }

    const newTask: Task = {
      id: randomUUID(),
      title,
      completed: false,
    };

    tasks.push(newTask);
    return newTask;
  }

  list(completed?: boolean): Task[] {
    if (completed === undefined) {
      return tasks;
    }
    return tasks.filter((task) => task.completed === completed);
  }

  findById(id: string): Task | undefined {
    return tasks.find((task) => task.id === id);
  }

  update(id: string, data: IUpdateTask): Task | null {
    const task = tasks.find((task) => task.id === id);
    if (!task) return null;

    if (data.title !== undefined) task.title = data.title;
    if (data.completed !== undefined) task.completed = data.completed;

    return task;
  }

  delete(id: string): boolean {
    const index = tasks.findIndex((task) => task.id === id);
    if (index === -1) return false;

    tasks.splice(index, 1);
    return true;
  }
}

export { TaskService };