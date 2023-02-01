import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  async create(@Body() createTodoDto: CreateTodoDto) {
    try {
      return await this.todoService.create(createTodoDto);
    } catch (error) {
      throw new InternalServerErrorException('INTERNAL SERVER ERROR', {
        cause: new Error(),
        description: error,
      });
    }
  }

  @Get()
  async findAll() {
    const todos = await this.todoService.findAll();
    if (!todos)
      throw new HttpException('No TODOS were found', HttpStatus.NOT_FOUND);
    return todos;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    await this._todoExists(id);
    return await this.todoService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    await this._todoExists(id);
    return await this.todoService.update(id, updateTodoDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this._todoExists(id);
    return await this.todoService.remove(id);
  }

  private async _todoExists(id: string): Promise<void> {
    const todo = await this.todoService.findOne(id);
    if (!todo) throw new HttpException('Todo Not Found', HttpStatus.NOT_FOUND);
  }
}
