// import { PipeTransform, BadRequestException } from '@nestjs/common';
// import { UserSchema } from '../schema/user.schema';
// import { UserDto } from '../Dto/User.Dto';

// export class CreateUserValidatorPipe implements PipeTransform<UserDto> {
//   public transform(value: UserDto): UserDto {
//     const result = UserSchema.validate(value);
//     if (result.error) {
//       const errorMessages = result.error.details.map((d) => d.message).join();
//       throw new BadRequestException(errorMessages);
//     }
//     return value;
//   }
// }
