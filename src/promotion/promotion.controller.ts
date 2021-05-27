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
import { CreatePromotionDto } from './dto/create-promotion.dto';
import { Promotion } from './promotion.entity';
import { PromotionService } from './promotion.service';
import { GetPromotionsFilterDto } from './dto/get-promotions-filter.dto';

@Controller('promotions')
export class PromotionController {
  private logger = new Logger('PromotionController');
  constructor(private promotionsService: PromotionService) {}

  @Get('')
  getPromotions(
    @Query(ValidationPipe) getPromotionsFilterDto: GetPromotionsFilterDto,
  ): Promise<Promotion[]> {
    this.logger.verbose(
      `Retrieving all promotions. Filter: ${JSON.stringify(
        getPromotionsFilterDto,
      )}`,
    );
    return this.promotionsService.getPromotions(getPromotionsFilterDto);
  }

  @Get('/:id')
  getPromotionById(@Param('id', ParseIntPipe) id: number): Promise<Promotion> {
    this.logger.verbose(`Retrieving promotion with id: ${id}`);
    return this.promotionsService.getPromotionById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createPromotion(
    @Body() createPromotionDto: CreatePromotionDto,
  ): Promise<Promotion> {
    this.logger.verbose(
      `Creating promotion with label: ${createPromotionDto.promotionLabel}`,
    );
    return this.promotionsService.createPromotion(createPromotionDto);
  }

  @Delete('/:id')
  deletePromotion(@Param('id', ParseIntPipe) id: number): Promise<void> {
    this.logger.verbose(`Deleting promotion with id: ${id}`);
    return this.promotionsService.deletePromotion(id);
  }

  @Patch('/:id')
  updatePromotion(
    @Param('id', ParseIntPipe) id: number,
    @Body() createPromotionDto: CreatePromotionDto,
  ): Promise<Promotion> {
    this.logger.verbose(`Updating promotion with id: ${id}`);
    return this.promotionsService.updatePromotion(id, createPromotionDto);
  }
}
