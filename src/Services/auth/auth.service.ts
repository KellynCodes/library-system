import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../../data/Models/user.schema';
import { UserSign } from './Dto/userSign';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(singUpDto: UserSign): Promise<{ token: string }> {
    const { email, password } = singUpDto;
    const isUserExist = this.userModel.findOne({ email });
    if (isUserExist) {
      throw new BadRequestException('Account exist with this email.');
    }

    const hashedPassword: string = await bcrypt.hash(password, 10);
    const user = await this.userModel.create({
      email,
      password: hashedPassword,
    });
    const token: string = this.jwtService.sign({ id: user._id });
    return { token };
  }

  async login(model: UserSign): Promise<{ token: string }> {
    const { email, password } = model;
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new UnauthorizedException('Invalid email or password.');
    }

    const isPasswordMatched: boolean = await bcrypt.compare(
      password,
      user.password,
    );
    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid email or password.');
    }

    const token: string = this.jwtService.sign({ id: user._id });
    return { token };
  }
}
