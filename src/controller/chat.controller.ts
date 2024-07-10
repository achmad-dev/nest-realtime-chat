import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ChatService } from 'src/service/chat.service';

@Controller('chat')
export class ChatController {
  constructor(private chatService: ChatService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('history')
  async getChatHistory(@Request() req) {
    return this.chatService.getRecentMessages(req.user.userId);
  }
}
