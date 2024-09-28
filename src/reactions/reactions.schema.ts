import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPositive, IsString } from 'class-validator';
import { Document, SchemaOptions, Types } from 'mongoose';

const options: SchemaOptions = {
  collection: 'reactions',
  timestamps: true,
};

@Schema(options)
export class Reactions extends Document {
  @ApiProperty({
    example: 'author@cat.com',
    description: '작성한 고양이 Id',
    required: true,
  })
  @Prop({
    type: Types.ObjectId,
    required: true,
    ref: 'cats',
  })
  @IsNotEmpty()
  author: string;

  @ApiProperty({
    example: 'cute cat',
    description: '반응 내용',
    required: true,
  })
  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  contents: string;

  @ApiProperty({
    example: 0,
    description: '좋아요 개수',
  })
  @Prop({
    default: 0,
    required: true,
  })
  @IsPositive()
  @IsNotEmpty()
  likeCount: number;

  @ApiProperty({
    example: 'imcat@cat.com',
    description: '반응이 작성된 고양이',
    required: true,
  })
  @Prop({
    type: Types.ObjectId,
    required: true,
    ref: 'cats',
  })
  @IsNotEmpty()
  info: string;
}

export const ReactionsSchema = SchemaFactory.createForClass(Reactions);
