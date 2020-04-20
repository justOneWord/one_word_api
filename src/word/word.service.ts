import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Word } from '../entity/word.entity';
import { Repository } from 'typeorm';
import { WordDto } from '../dto/wordDto';
import { ApiException } from '../filters/api.exception';
import { ApiCode } from '../enums/api-code.enums';

@Injectable()
export class WordService {
  // 注入数据库表
  constructor(@InjectRepository(Word) private readonly wordReposition:Repository<Word>) {
  }
  async add(body: WordDto) {
    // 查找是否存在
    const result = await this.wordReposition.find({ word: body.word })
    if (result.length > 0) {
       throw new ApiException('资源已经存在', ApiCode.EXIST_ERROR, 200);
    }


    const newWord = await this.wordReposition.create({
      ...body
    })
    console.log("newWord")
    const newResult= await this.wordReposition.save(newWord)
    if(newResult){
      //  插入成功
      return true
    }else{
      throw new ApiException('添加失败', ApiCode.BUSINESS_ERROR, 200)
    }
  }
}
