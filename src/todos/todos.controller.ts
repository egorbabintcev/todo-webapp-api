import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Req,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { TodosService } from 'src/todos/todos.service';
import { CreateTodoDto, UpdateTodoDto } from 'src/todos/dto/todo.dto';
import { MongooseExceptionFilter } from 'src/common/filters/mongoose-exception.filter';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@UseFilters(new MongooseExceptionFilter())
@UseGuards(new JwtAuthGuard())
@Controller('todos')
export class TodosController {
  constructor(
    private todosService: TodosService,
    private jwtService: JwtService,
  ) {}

  @Get()
  async findAll(@Req() req: Request) {
    const jwtToken = req.headers.authorization.substring(7);
    const { sub: userId } = this.jwtService.decode(jwtToken);
    return await this.todosService.findAll(userId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Req() req: Request) {
    const jwtToken = req.headers.authorization.substring(7);
    const { sub: userId } = this.jwtService.decode(jwtToken);
    const todo = await this.todosService.findOne(id, userId);
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
  async update(
    @Param('id') id: string,
    @Body() updateTodoDto: UpdateTodoDto,
    @Req() req: Request,
  ) {
    const jwtToken = req.headers.authorization.substring(7);
    const { sub: userId } = this.jwtService.decode(jwtToken);
    return await this.todosService.update(id, updateTodoDto, userId);
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Req() req: Request) {
    const jwtToken = req.headers.authorization.substring(7);
    const { sub: userId } = this.jwtService.decode(jwtToken);
    return await this.todosService.delete(id, userId);
  }
}
