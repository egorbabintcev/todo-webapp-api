import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import * as mongoose from 'mongoose';

@Catch(mongoose.Error)
export class MongooseExceptionFilter implements ExceptionFilter {
  catch(exception: mongoose.Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    if (exception instanceof mongoose.Error.ValidationError) {
      response
        .status(400)
        .json({
          statusCode: 400,
          message: `Bad request. ${exception.message}`,
        });
    } else {
      response
        .status(500)
        .json({
          statusCode: 500,
          message: 'Internal server error',
        });
    }

  }
}
