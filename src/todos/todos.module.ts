import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
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
          schema
            .path('createdBy')
            .validate(async (id: string): Promise<boolean> => {
              const user = await usersService.findOne({ _id: id });
              if (user) {
                return true;
              }
              return false;
            }, 'User not found.');
          return schema;
        },
        inject: [UsersService],
      },
    ]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [TodosController],
  providers: [TodosService],
})
export class TodosModule {}
