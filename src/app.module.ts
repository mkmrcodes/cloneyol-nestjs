import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemsModule } from './items/items.module';
import { config } from './config/config';
import { DatabaseConfig } from './config/database.config';
import { PhotosModule } from './photos/photos.module';
import { UsersModule } from './users/users.module';
import { CartModule } from './cart/cart.module';
import { ProfileModule } from './profile/profile.module';
import { ShippingModule } from './shipping/shipping.module';
import { BillingModule } from './billing/billing.module';
import { Connection } from 'typeorm';
import { CartItemModule } from './cart-item/cart-item.module';
import { CategoryModule } from './category/category.module';
import { MerchantModule } from './merchant/merchant.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { BrandModule } from './brand/brand.module';
import { PromotionModule } from './promotion/promotion.module';
import { RatingsModule } from './ratings/ratings.module';
import { CommentsModule } from './comment/comments.module';
import { SearchModule } from './search/search.module';
import { BasketModule } from './basket/basket.module';
import { BasketItemsModule } from './basketitems/basketitems.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: DatabaseConfig,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      exclude: ['/api*'],
      // serveStaticOptions: {
      //   fallthrough: false,
      // },
    }),
    ItemsModule,
    PhotosModule,
    UsersModule,
    CartModule,
    ProfileModule,
    ShippingModule,
    BillingModule,
    CartItemModule,
    CategoryModule,
    MerchantModule,
    BrandModule,
    PromotionModule,
    RatingsModule,
    CommentsModule,
    SearchModule,
    BasketModule,
    BasketItemsModule,
  ],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
