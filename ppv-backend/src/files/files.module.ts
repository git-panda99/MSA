import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { FilesController } from './files.controller';

@Module({
  controllers: [FilesController],
  imports: [MulterModule.register({
    dest: './uploads',
  })],
})
export class FilesModule {}
