import { Module } from '@nestjs/common';
import { WordService } from './word.service';
import { WordController } from './word.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Word } from '../entity/word.entity'

@Module({
  imports:[TypeOrmModule.forFeature([Word])],
  providers: [WordService],
  controllers: [WordController]
})
export class WordModule {}
