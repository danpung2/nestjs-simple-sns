import { Body, Controller, Get, Param, Post, Patch, Delete, UseGuards } from '@nestjs/common';
import { ReactionsService } from '../service/reactions.service';
import { ApiOperation } from '@nestjs/swagger';
import { ReactionsCreateDto } from '../dto/reactions.create.dto';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { Cat } from 'src/cats/cats.schema';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';

@Controller('reactions')
export class ReactionsController {
  constructor(private readonly reactionsService: ReactionsService) {}

  @ApiOperation({ summary: '모든 고양이 프로필에 적힌 반응 가져오기' })
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllReactions() {
    return this.reactionsService.getAllReactions();
  }

  @ApiOperation({ summary: '고양이한테 반응 달기' })
  @UseGuards(JwtAuthGuard)
  @Post(':id')
  async createReaction(@Param('id') id: string, @Body() body: ReactionsCreateDto) {
    return this.reactionsService.createReaction(id, body);
  }

  @ApiOperation({ summary: '반응 좋아요 수 올리기' })
  @UseGuards(JwtAuthGuard)
  @Patch(':id/like')
  async plusLike(@Param('id') id: string) {
    return this.reactionsService.plusLike(id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  async deleteReaction(@Param("id") id: string, @CurrentUser() cat: Cat){
    return this.reactionsService.deleteReaction(id, cat);
  }
}
