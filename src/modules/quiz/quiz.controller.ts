import { Controller, Get } from '@nestjs/common';

@Controller()
export class QuizController {
  @Get('/quiz')
  //   @HttpStatus(201)
  getAllQuiz(): number[] {
    return [1, 2, 3];
  }
}
