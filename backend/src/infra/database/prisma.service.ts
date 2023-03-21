import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { randomUUID } from 'crypto';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
    await this.task.create({
      data: {
        id: randomUUID(),
        ownerId: '3ac4f5a9-44cd-464f-8897-9cec1f0e5ebf',
        label: 'Study NestJS',
        category: 'Personal',
        expiration: new Date(),
      },
    });
    await this.task.create({
      data: {
        id: randomUUID(),
        ownerId: '3ac4f5a9-44cd-464f-8897-9cec1f0e5ebf',
        label: 'Study remix.run',
        category: 'Personal',
        expiration: new Date(),
      },
    });
    await this.task.create({
      data: {
        id: randomUUID(),
        ownerId: '3ac4f5a9-44cd-464f-8897-9cec1f0e5ebf',
        label: 'Do a todo-list',
        category: 'Business',
        expiration: new Date(),
      },
    });
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
