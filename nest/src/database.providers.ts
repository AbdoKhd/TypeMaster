import { DataSource } from 'typeorm';
import 'dotenv/config';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT || '3306', 10),
        username: process.env.DB_USERNAME || 'root',
        password: process.env.DB_PASSWORD || 'rootroot',
        database: process.env.DB_NAME || 'TypeMaster_db',
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
      });

      return dataSource.initialize();
    },
  },
]; 