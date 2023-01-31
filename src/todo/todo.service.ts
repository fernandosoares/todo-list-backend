import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodoRepository } from './todo.repository';

@Injectable()
export class TodoService {
  constructor(private todoRepository: TodoRepository) {}

  create(createTodoDto: CreateTodoDto) {
    return this.todoRepository.create(createTodoDto);
  }

  findAll() {
    return this.todoRepository.findAll();
  }

  findOne(id: string) {
    return this.todoRepository.findOne(id);
  }

  update(id: string, updateTodoDto: UpdateTodoDto) {
    return this.todoRepository.update(id, updateTodoDto);
  }

  remove(id: string) {
    return this.todoRepository.remove(id);
  }
}
