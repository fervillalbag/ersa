export class CreateUserDTO {
  name: string;
  email: string;
  password: string;
  role: string;
}

export class LoginUserDTO {
  email: string;
  password: string;
}
