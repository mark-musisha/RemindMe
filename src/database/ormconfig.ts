import { SnakeNamingStrategy } from '../snake-naming.strategy';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';
import { readFileSync } from 'fs';
import * as path from 'path';
import { UserSubscriber } from 'src/entity-subscribers';

const dbConfig = config.get('db');

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: dbConfig.type,
  host: dbConfig.host,
  port: dbConfig.port,
  username: dbConfig.username,
  password: dbConfig.password,
  database: dbConfig.database,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: dbConfig.synchronize,
  cache: false,
  namingStrategy: new SnakeNamingStrategy(),
  subscribers: [UserSubscriber],
  ssl:
    process.env.NODE_ENV === 'production'
      ? {
          ca: readFileSync(
            path.join(process.env.PWD, './CERTIFICATE_PATH/NAME.cer'),
          ),
        }
      : undefined,
};
