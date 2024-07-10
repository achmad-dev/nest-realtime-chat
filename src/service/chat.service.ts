import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message, MessageDocument } from 'src/model/chat.model';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
  ) {}

  async saveMessage(content: string, userId: string): Promise<Message> {
    const newMessage = new this.messageModel({
      content,
      userId,
    });

    try {
      const savedMessage = await newMessage.save();
      console.log(`Saved message from user ${userId}: ${content}`);
      return savedMessage;
    } catch (error) {
      console.error('Error saving message:', error);
      throw error;
    }
  }

  async getRecentMessages(
    userId: string,
    limit: number = 50,
  ): Promise<Message[]> {
    return this.messageModel
      .find({ userId })
      .sort({ createdAt: -1 })
      .limit(limit)
      .populate('userId', 'username')
      .exec();
  }
}
