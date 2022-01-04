import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsModule } from './events/events.module';
import { UsersModule } from './users/users.module';
import { TicketsModule } from './tickets/tickets.module';
import { CategoriesModule } from './categories/categories.module';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { FilesModule } from './files/files.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3308,
      username: 'root',
      password: '',
      database: 'ppv_db',
      autoLoadEntities: true,
      synchronize: true,
    }),
    EventsModule,
    UsersModule,
    TicketsModule,
    CategoriesModule,
    AuthModule,
    FilesModule,
  ],
  controllers: [AppController],
  providers: [
    {
    provide: APP_GUARD,
    useClass: JwtAuthGuard,
  }]
})
export class AppModule {}
