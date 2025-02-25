import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './entities/user.entity';
import { Project } from './entities/project.entity';
import { Category } from './entities/category.entity';
import { Item } from './entities/item.entity';
import { Attribute } from './entities/attribute.entity';
import { ItemAttribute } from './entities/item-attribute.entity';
import { UsersModule } from './users/users.module';
import { ProjectsModule } from './projects/projects.module';
import { CategoriesModule } from './categories/categories.module';
import { ItemsModule } from './items/items.module';
import { AttributesModule } from './attributes/attributes.module';
import { ItemAttributesModule } from './item-attributes/item-attributes.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: process.env.NODE_ENV === 'development', // DO NOT USE IN PRODUCTION
      logging: process.env.NODE_ENV === 'development',
    }),
    TypeOrmModule.forFeature([
      User,
      Project,
      Category,
      Item,
      Attribute,
      ItemAttribute,
    ]),
    UsersModule,
    ProjectsModule,
    CategoriesModule,
    ItemsModule,
    AttributesModule,
    ItemAttributesModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
