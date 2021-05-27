import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { GetCommentsFilterDto } from './dto/get-comments-filter.dto';
import { Comment } from './comment.entity';
import { CommentsService } from './comments.service';

@Controller('comments')
export class CommentsController {
  private logger = new Logger('CommentsController');
  constructor(private commentsService: CommentsService) {}

  @Get('/:id')
  getCommentById(@Param('id', ParseIntPipe) id: number): Promise<Comment> {
    this.logger.verbose(`Retrieving comment with id: ${id}`);
    return this.commentsService.getCommentById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createComment(@Body() createCommentDto: CreateCommentDto): Promise<Comment> {
    this.logger.verbose(`Creating comment`);
    return this.commentsService.createComment(createCommentDto);
  }

  @Delete('/:id')
  deleteComment(@Param('id', ParseIntPipe) id: number): Promise<void> {
    this.logger.verbose(`Deleting comment with id: ${id}`);
    return this.commentsService.deleteComment(id);
  }

  @Patch('/:id')
  updateComment(
    @Param('id', ParseIntPipe) id: number,
    @Body() createCommentDto: CreateCommentDto,
  ): Promise<Comment> {
    this.logger.verbose(`Updating comment with id: ${id}`);
    return this.commentsService.updateComment(id, createCommentDto);
  }

  @Get('')
  getComments(
    @Query(ValidationPipe) getCommentsFilterDto: GetCommentsFilterDto,
  ): Promise<Comment[]> {
    this.logger.verbose(
      `Retrieving all comments. Filter: ${JSON.stringify(
        getCommentsFilterDto,
      )}`,
    );
    return this.commentsService.getComments(getCommentsFilterDto);
  }
}
