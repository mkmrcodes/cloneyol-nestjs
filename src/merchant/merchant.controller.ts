import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateMerchantDto } from './dto/create-merchant.dto';
import { GetMerchantsFilterDto } from './dto/get-merchants-filter.dto';
import { Merchant } from './merchant.entity';
import { MerchantService } from './merchant.service';

@Controller('merchants')
export class MerchantController {
  private logger = new Logger('MerchantController');
  constructor(private merchantsService: MerchantService) {}

  @Get('')
  getMerchants(
    @Query(ValidationPipe) getMerchantsFilterDto: GetMerchantsFilterDto,
  ): Promise<Merchant[]> {
    this.logger.verbose(
      `Retrieving all merchants. Filter: ${JSON.stringify(
        getMerchantsFilterDto,
      )}`,
    );
    return this.merchantsService.getMerchants(getMerchantsFilterDto);
  }

  @Get('/:id')
  getMerchantById(@Param('id') id: number): Promise<Merchant> {
    this.logger.verbose(`Retrieving merchant with id: ${id}`);
    return this.merchantsService.getMerchantById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createMerchant(
    @Body() createMerchantDto: CreateMerchantDto,
  ): Promise<Merchant> {
    this.logger.verbose(
      `Creating merchant with name: ${createMerchantDto.name}`,
    );
    return this.merchantsService.createMerchant(createMerchantDto);
  }

  @Delete('/:id')
  deleteMerchant(@Param('id') id: number): Promise<void> {
    this.logger.verbose(`Deleting merchant with id: ${id}`);
    return this.merchantsService.deleteMerchant(id);
  }

  @Patch('/:id')
  updateMerchant(
    @Param('id') id: number,
    @Body() createMerchantDto: CreateMerchantDto,
  ): Promise<Merchant> {
    this.logger.verbose(`Updating merchant with id: ${id}`);
    return this.merchantsService.updateMerchant(id, createMerchantDto);
  }
}
