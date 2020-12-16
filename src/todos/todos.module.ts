import { BadRequestException, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Todo, TodoSchema } from 'src/todos/schemas/todo.schema';
import { TodosController } from 'src/todos/todos.controller';
import { TodosService } from 'src/todos/todos.service';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        imports: [UsersModule],
        name: Todo.name,
        useFactory: (usersService: UsersService) => {
          const schema = TodoSchema;
          schema.path('createdBy').validate(
            async (id: string): Promise<boolean> => {
              const user = await usersService.findOne({ _id: id });
              console.log(user);
              if (user) {
                return true;
              }
              return false;
            },
            'User not found.',
          );
          return schema;
        },
        inject: [UsersService],
      }
    ]),
  ],
  controllers: [TodosController],
  providers: [TodosService]
})
export class TodosModule {}
