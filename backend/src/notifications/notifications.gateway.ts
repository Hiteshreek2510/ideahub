import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { PrismaService } from '../prisma/prisma.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class NotificationsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private connectedClients = new Map<string, Socket>();

  constructor(private prisma: PrismaService) {}

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
    this.connectedClients.delete(client.id);
  }

  @SubscribeMessage('register')
  handleRegister(@MessageBody() userId: string, @ConnectedSocket() client: Socket) {
    // Associate the user's ID with their socket connection
    this.connectedClients.set(userId, client);
    console.log(`User ${userId} registered with socket ${client.id}`);
    return { event: 'registered', data: { success: true } };
  }

  // Method to be called by other modules to emit real-time notifications
  async sendNotification(userId: string, notificationData: any) {
    // 1. Save to database
    const notification = await this.prisma.notification.create({
      data: {
        user_id: userId,
        type: notificationData.type,
        content: notificationData.content,
      },
    });

    // 2. Emit in real-time if user is online
    const clientSocket = this.connectedClients.get(userId);
    if (clientSocket) {
      clientSocket.emit('notification', notification);
    }
  }

  // Handle live chat messages in community groups
  @SubscribeMessage('send_message')
  async handleMessage(@MessageBody() payload: { groupId: string, text: string, senderId: string }) {
    // In a full implementation, we would save this to the DB.
    // For now, we just broadcast it to anyone in the group "room"
    this.server.to(`group_${payload.groupId}`).emit('new_message', payload);
  }

  @SubscribeMessage('join_group')
  handleJoinGroup(@MessageBody() groupId: string, @ConnectedSocket() client: Socket) {
    client.join(`group_${groupId}`);
    return { event: 'joined', data: groupId };
  }
}
