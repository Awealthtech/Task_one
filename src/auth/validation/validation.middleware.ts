import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { CreateTodoDto } from '../Dto/CreateTodo.Dto';

@Injectable()
export class ValidationMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { error } = CreateTodoDto.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    next();
  }
}
