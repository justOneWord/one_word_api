import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Post, UsePipes } from '@nestjs/common';
import { WordDto } from '../dto/wordDto';
import { ValidationPipe } from '../pipe/validation.pipe';
import { WordService } from './word.service';

@Controller('word')
export class WordController {
  constructor(private readonly wordService:WordService) {
  }
  @Get()
  index(){
    return 123
  }

  @Post()
  // 参数校验
  @UsePipes(ValidationPipe)
  @HttpCode(200)
  async add(@Body() body: WordDto) {
    await this.wordService.add(body)
  }
}
