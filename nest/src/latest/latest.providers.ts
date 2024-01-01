import { DataSource } from 'typeorm';
import { Latest } from './latest.entity';

export const latestProviders = [
  {
    provide: 'LATEST_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Latest),
    inject: ['DATA_SOURCE'],
  },
];
