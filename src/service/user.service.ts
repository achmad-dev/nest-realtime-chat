import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from 'src/model/user.model';
import { CreateUserDto } from 'src/dto/create-user.dto';

@Injectable()
export class UserService {
  private logger: Logger = new Logger('User Service');
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }
  async findOne(id: string): Promise<User> {
    this.logger.debug(id);
    return this.userModel.findById(id).exec();
  }
}
