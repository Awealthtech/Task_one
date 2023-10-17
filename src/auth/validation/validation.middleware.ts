import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { ObjectSchema } from 'joi';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private schema: ObjectSchema) {}
  transform(value: any) {
    try {
      this.schema.validate(value);
      return value;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
