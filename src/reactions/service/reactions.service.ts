import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ReactionsCreateDto } from '../dto/reactions.create.dto';
import { CatsRepository } from 'src/cats/cats.repository';
import { ReactionsRepository } from '../reactions.repository';
import { Cat } from 'src/cats/cats.schema';

@Injectable()
export class ReactionsService {
  constructor(
    private readonly reactionsRepository: ReactionsRepository,
    private readonly catsRepository: CatsRepository,
  ) {}

  async getAllReactions() {
    const reactions = await this.reactionsRepository.findAll();
    return reactions;
  }

  async createReaction(id: string, reaction: ReactionsCreateDto) {
    const targetCat =
        await this.catsRepository.findCatByIdWithoutPassword(id);
      const { author, contents } = reaction;

      const validatedAuthor =
        await this.catsRepository.findCatByIdWithoutPassword(author);
        
      const newReaction = this.reactionsRepository.create(validatedAuthor, contents, targetCat);
      return newReaction;
  }

  async plusLike(id: string) {
    const reaction = this.reactionsRepository.plusLike(id);
    return reaction;
  }

  async deleteReaction(id: string, cat: Cat){
    const reaction = await this.reactionsRepository.findById(id);

    if (reaction && String(reaction.author) === cat.id){
        this.reactionsRepository.deleteById(id);
    } else {
        throw new UnauthorizedException("작성한 반응만 삭제할 수 있습니다.");
    }
  }
}
