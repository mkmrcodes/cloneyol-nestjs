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
import { CreateShippingDto } from './dto/create-shipping.dto';
import { Shipping } from './shipping.entity';
import { ShippingService } from './shipping.service';

@Controller('shipping')
export class ShippingController {
  private logger = new Logger('ShippingController');
  constructor(private shippingService: ShippingService) {}

  @Get('/:id')
  getShippingById(@Param('id', ParseIntPipe) id: string): Promise<Shipping> {
    this.logger.verbose(`Retrieving shipping with id: ${id}`);
    return this.shippingService.getShippingById(id);
  }

  @Get('/check/:userId')
  getShippingsByUserId(@Param('userId') userId: string): Promise<Shipping[]> {
    this.logger.verbose(`Retrieving all shippings with userId: ${userId}`);
    return this.shippingService.getShippingsByUserId(userId);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createShipping(
    @Body() createShippingDto: CreateShippingDto,
  ): Promise<Shipping> {
    this.logger.verbose(
      `Creating shipping with profile id: ${createShippingDto.profile.id}`,
    );
    return this.shippingService.createShipping(createShippingDto);
  }

  @Delete('/:id')
  deleteShipping(@Param('id', ParseIntPipe) id: string): Promise<void> {
    this.logger.verbose(`Deleting shipping with id: ${id}`);
    return this.shippingService.deleteShipping(id);
  }

  @Patch('/:id/update')
  updateShipping(
    @Param('id') id: string,
    @Body() createShippingDto: CreateShippingDto,
  ): Promise<Shipping> {
    this.logger.verbose(`Updating shipping with id: ${id}`);
    return this.shippingService.updateShipping(id, createShippingDto);
  }
}
