import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { CreateUserDTO, LoginUserDTO } from './dto/user.dto';
import { UserInterface } from './interfaces/user.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserInterface>,
    private jwtService: JwtService,
  ) {}

  async createUser(createUserDTO: CreateUserDTO): Promise<UserInterface> {
    const newUser = createUserDTO;
    newUser.email = newUser.email.toLocaleLowerCase();

    const { email } = newUser;
    const foundEmail = await this.userModel.findOne({ email });
    if (foundEmail) throw new NotFoundException(`El email ya existe`);

    const saltOrRounds = 10;
    newUser.password = await bcrypt.hash(newUser.password, saltOrRounds);

    const user = new this.userModel(newUser);
    return await user.save();
  }

  async loginUser(loginUserDTO: LoginUserDTO): Promise<any> {
    const currentUser = loginUserDTO;
    currentUser.email = currentUser.email.toLocaleLowerCase();

    const foundUser = await this.userModel.findOne({
      email: currentUser.email.toLocaleLowerCase(),
    });
    if (!foundUser) throw new NotFoundException(`El usuario no existe`);

    const passwordSuccess = await bcrypt.compare(
      currentUser.password,
      foundUser.password,
    );
    if (!passwordSuccess)
      throw new NotFoundException(`Las credenciales no son válidas`);

    const payload = {
      _id: foundUser._id,
      email: foundUser.email,
      name: foundUser.name,
    };

    return this.jwtService.sign(payload);
  }

  async updateUser(
    id: string,
    createUserDTO: CreateUserDTO,
  ): Promise<UserInterface> {
    const user = this.userModel.findOneAndUpdate({ _id: id }, createUserDTO, {
      new: true,
    });
    return user;
  }

  async deleteUser(id: string): Promise<UserInterface> {
    const user = await this.userModel.findOneAndDelete({ _id: id });
    return user;
  }

  async getUsers(): Promise<UserInterface[]> {
    const users = await this.userModel.find({});
    return users;
  }

  async getUser(id: string): Promise<UserInterface> {
    const user = await this.userModel.findOne({ _id: id });
    return user;
  }
}
