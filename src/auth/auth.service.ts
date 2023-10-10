import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  UserLoginGet(): string {
    return 'login respond provider  successfully created';
  }

  UserLoginPost(): string {
    return 'login request provider successfully created';
  }

  userSignupGet() {
    return 'signup response provider successfully created';
  }

  userSignupPost() {
    return 'signup request provider successfully created';
  }
}
