import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, UseFilters, UseGuards } from '@nestjs/common';
import { TodosService } from 'src/todos/todos.service';
import { CreateTodoDto, UpdateTodoDto } from 'src/todos/dto/todo.dto';
import { MongooseExceptionFilter } from 'src/common/filters/mongoose-exception.filter';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@UseFilters(new MongooseExceptionFilter())
@UseGuards(new JwtAuthGuard())
@Controller('todos')
export class TodosController {
  constructor(private todosService: TodosService) {}

  @Get()
  async findAll() {
    return await this.todosService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const todo = await this.todosService.findOne(id);
    if (!todo) {
      throw new NotFoundException();
    }
    return todo;
  }

  @Post()
  async create(@Body() createTodoDto: CreateTodoDto) {
    return await this.todosService.create(createTodoDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return await this.todosService.update(id, updateTodoDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.todosService.delete(id);
  }
}
