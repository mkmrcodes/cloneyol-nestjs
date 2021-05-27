import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { GetCommentsFilterDto } from './dto/get-comments-filter.dto';
import { Comment } from './comment.entity';
import { CommentsRepository } from './comments.repository';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(CommentsRepository)
    private commentRepository: CommentsRepository,
  ) {}

  async getCommentById(id: number): Promise<Comment> {
    const found = await this.commentRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(`Comment with ID:${id} not found`);
    }
    return found;
  }

  async getComments(
    getCommentsFilterDto: GetCommentsFilterDto,
  ): Promise<Comment[]> {
    return this.commentRepository.getComments(getCommentsFilterDto);
  }
  async createComment(createCommentDto: CreateCommentDto): Promise<Comment> {
    return this.commentRepository.createComment(createCommentDto);
  }
  async deleteComment(id: number): Promise<void> {
    const result = await this.commentRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Comment with ID:${id} not found`);
    }
  }
  async updateComment(
    id: number,
    createCommentDto: CreateCommentDto,
  ): Promise<Comment> {
    const comment = await this.getCommentById(id);
    const updated = Object.assign(comment, createCommentDto);
    await updated.save();
    return updated;
  }
}
