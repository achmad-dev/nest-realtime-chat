import { LoginDto } from 'src/dto/login.dto';
import { CreateUserDto } from 'src/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { User } from 'src/model/user.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async signup(createUserDto: CreateUserDto) {
    const { username, password } = createUserDto;
    const existingUser = await this.userModel.findOne({ username }).exec();
    if (existingUser) {
      throw new ConflictException('Username already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new this.userModel({ username, password: hashedPassword });
    await newUser.save();
    const payload = { username: newUser.username, sub: newUser._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async login(loginDto: LoginDto) {
    const { username, password } = loginDto;
    const user = await this.userModel.findOne({ username }).exec();
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { username: user.username, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
