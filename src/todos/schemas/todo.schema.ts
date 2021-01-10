import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types as MongooseTypes } from 'mongoose';

export type TodoDocument = Todo & Document;

@Schema({ timestamps: true })
export class Todo {
  @Prop({ required: true })
  title: string;

  @Prop({ default: false })
  isCompleted: boolean;

  @Prop({ type: MongooseTypes.ObjectId, ref: 'User' })
  createdBy: string;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
