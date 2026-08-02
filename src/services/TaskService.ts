import { prisma } from '../config/prismaClient';
import { Prisma } from '../../generated/prisma/client';

class TaskService {
  async create(title: string) {
    if (!title) {
      throw new Error('O título é obrigatório');
    }
    return prisma.task.create({ data: { title } });
  }

  async getAll(completed?: boolean) {
    if (completed === undefined) {
      return prisma.task.findMany();
    }
    return prisma.task.findMany({ where: { completed } });
  }

  async getById(id: number) {
    return prisma.task.findUnique({ where: { id } });
  }

  async update(id: number, data: { title?: string; completed?: boolean }) {
    try {
      return await prisma.task.update({ where: { id }, data });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        return null;
      }
      throw error;
    }
  }

  async delete(id: number) {
    try {
      await prisma.task.delete({ where: { id } });
      return true;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        return false;
      }
      throw error;
    }
  }
}

export { TaskService };