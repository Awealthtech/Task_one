/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { QuizService } from './quiz.service';
import { createQuizDto } from './dto/CreateQuiz.dto';

@Controller()
export class QuizController {
  constructor(private QuizService: QuizService) {}

  @Get('/quiz')
  @HttpCode(200)
  getAllQuiz() {
    return this.QuizService.getAllQuiz();
  }

  @Post('/create')
  @UsePipes(ValidationPipe)
  createQuiz(@Body() QuizData: createQuizDto) {
    return { data: QuizData };
  }
}
