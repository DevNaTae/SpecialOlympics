import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: 'ep-round-mud-a5zwf04z.us-east-2.aws.neon.tech',
        port: 5432,
        username: 'neondb_owner',
        password: 'FjnJlBK2gs5c',
        database: 'neondb',
        entities: [__dirname + '/../**/*.interface{.ts,.js}'],
        synchronize: true,
        ssl: true,
      });

      return dataSource.initialize();
    },
  },
];
