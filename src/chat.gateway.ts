import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayInit,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { ChatService } from './service/chat.service';
import { JwtService } from '@nestjs/jwt';
import { Logger } from '@nestjs/common';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:3001', // replace with your frontend URL
    methods: ['GET', 'POST'],
    credentials: true,
  },
})
export class ChatGateway implements OnGatewayInit {
  private logger: Logger = new Logger('ChatGateway');

  @WebSocketServer() server: Server;

  constructor(
    private chatService: ChatService,
    private jwtService: JwtService,
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  afterInit(server: Server) {
    this.logger.log('Init');
  }

  @SubscribeMessage('message')
  async handleMessage(
    @MessageBody() message: string,
    @ConnectedSocket() client: Socket,
  ) {
    try {
      const auth = client.handshake.auth; // to extract userId from socket auth
      const decoded = this.jwtService.decode(auth['token']);
      const savedMessage = await this.chatService.saveMessage(
        message,
        decoded.sub,
      );
      this.server.emit('message', {
        username: decoded.username,
        message: savedMessage.content,
      });
    } catch (error) {
      console.error('Error handling message:', error);
      client.emit('error', 'Failed to save message');
    }
  }
}
