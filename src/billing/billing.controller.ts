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
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateBillingDto } from './dto/create-billing.dto';
import { Billing } from './billing.entity';
import { BillingService } from './billing.service';

@Controller('billing')
export class BillingController {
  private logger = new Logger('BillingController');
  constructor(private billingService: BillingService) {}

  @Get('/:id')
  getBillingById(@Param('id', ParseIntPipe) id: string): Promise<Billing> {
    this.logger.verbose(`Retrieving billing with id: ${id}`);
    return this.billingService.getBillingById(id);
  }

  @Get('/check/:userId')
  getBillingsByUserId(@Param('userId') userId: string): Promise<Billing[]> {
    this.logger.verbose(`Retrieving all billings with userId: ${userId}`);
    return this.billingService.getBillingsByUserId(userId);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createBilling(@Body() createBillingDto: CreateBillingDto): Promise<Billing> {
    this.logger.verbose(
      `Creating billing with profile id: ${createBillingDto.profile.id}`,
    );
    return this.billingService.createBilling(createBillingDto);
  }

  @Delete('/:id')
  deleteBilling(@Param('id', ParseIntPipe) id: string): Promise<void> {
    this.logger.verbose(`Deleting billing with id: ${id}`);
    return this.billingService.deleteBilling(id);
  }

  @Patch('/:id/update')
  updateBilling(
    @Param('id') id: string,
    @Body() createBillingDto: CreateBillingDto,
  ): Promise<Billing> {
    this.logger.verbose(`Updating billing with id: ${id}`);
    return this.billingService.updateBilling(id, createBillingDto);
  }
}
