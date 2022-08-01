import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './entity/customer.entity';
import { User } from './entity/user.entity';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://mongoadmin:secret@localhost:27017', {
    //MongooseModule.forRoot('mongodb://localhost:27017/test', {
      useNewUrlParser: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'my-secret-pw',
      database: 'test',
      entities: [User, Customer],
      synchronize: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class DatabaseModule {}
