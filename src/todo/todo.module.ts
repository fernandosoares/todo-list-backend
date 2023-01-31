import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { PrismaService } from 'src/database/prisma.service';
import { TodoRepository } from './todo.repository';

@Module({
  controllers: [TodoController],
  providers: [TodoService, TodoRepository, PrismaService],
})
export class TodoModule {}
