import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Reactions } from './reactions.schema';
import { Model } from 'mongoose';
import { Cat } from 'src/cats/cats.schema';

@Injectable()
export class ReactionsRepository {
  constructor(
    @InjectModel(Reactions.name) private readonly reactionModel: Model<Reactions>,
  ) {}

  async findAll() {
    return await this.reactionModel.find();
  }

  async findById(id: string){
    return await this.reactionModel.findById(id);
  }

  async create(author: Cat, contents: string, target: Cat): Promise<Reactions> {
    const newReaction = new this.reactionModel({
      author: author._id,
      contents,
      info: target._id,
    });
    return await newReaction.save();
  }

  async plusLike(id: string) {
    const reaction = await this.reactionModel.findById(id);
    reaction.likeCount += 1;
    return await reaction.save();
  }

  async deleteById(id: string){
    return await this.reactionModel.deleteOne({_id: id});
  }
}
