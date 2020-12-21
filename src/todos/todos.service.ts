import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Todo, TodoDocument } from 'src/todos/schemas/todo.schema';
import { CreateTodoDto, UpdateTodoDto } from 'src/todos/dto/todo.dto';

@Injectable()
export class TodosService {
  constructor(@InjectModel(Todo.name) private todoModel: Model<TodoDocument>) {}

  async findAll(userId: string): Promise<TodoDocument[]> {
    return await this.todoModel.find({ createdBy: userId });
  }

  async findOne(id: string, userId: string): Promise<TodoDocument> {
    return await this.todoModel.findOne({ _id: id, createdBy: userId });
  }

  async create(createTodoDto: CreateTodoDto): Promise<TodoDocument> {
    const newTodo = new this.todoModel(createTodoDto);
    return await newTodo.save();
  }

  async update(
    id: string,
    updateTodoDto: UpdateTodoDto,
    userId: string,
  ): Promise<TodoDocument> {
    return await this.todoModel.updateMany(
      { _id: id, createdBy: userId },
      updateTodoDto,
    );
  }

  async delete(id: string, userId: string): Promise<any> {
    return await this.todoModel.deleteMany({ _id: id, createdBy: userId });
  }
}
