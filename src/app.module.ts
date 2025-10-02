import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { UsersModule } from './users/users.module';
import { WorkersModule } from './workers/workers.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
     
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'r7eam',
      database: 'Craft_mosul',
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
    WorkersModule,
  ],
})
export class AppModule {}