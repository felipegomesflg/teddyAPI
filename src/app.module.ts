import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientModule } from './client/client.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, 
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + '/**/*.entity.{ts,js}'], 
      migrations: [__dirname + '/migrations/*.{ts,js}'], 
      synchronize: false, 
      migrationsRun: true, 
    }),
    TypeOrmModule.forRoot({ //sqllite para testes e22e
      type: 'sqlite',
      database: ':memory:',
      entities: [__dirname + '/**/*.entity.{ts,js}'],
      synchronize: true, 
    }),
    
    ClientModule,
  ],
})
export class AppModule {}
