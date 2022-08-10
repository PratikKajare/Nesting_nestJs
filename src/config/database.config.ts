import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';

@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {
  constructor(private configService: ConfigService) {}

  createMongooseOptions(): MongooseModuleOptions {
    return {
      uri: 'mongodb+srv://pratikkajare:2813pratik@cluster1.j5xcliw.mongodb.net/mongooseOrm?retryWrites=true&w=majority',
    };
  }
}

// return this.configService.get('database.host', { infer: true });
