import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodoRepository {
  constructor(private prisma: PrismaService) {}

  create(todo: CreateTodoDto) {
    return this.prisma.todo.create({ data: todo });
  }

  findAll() {
    try {
      return this.prisma.todo.findMany();
    } catch (err) {}
  }

  findOne(id: string) {
    return this.prisma.todo.findFirst({
      where: {
        id,
      },
    });
  }

  update(id: string, todo: UpdateTodoDto) {
    return this.prisma.todo.update({
      data: todo,
      where: {
        id,
      },
    });
  }

  remove(id: string) {
    return this.prisma.todo.delete({
      where: {
        id,
      },
    });
  }
}
