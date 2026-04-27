TypeOrmModule.forRootAsync({
  useFactory: () => {
    const isSqlite = process.env.DB_TYPE === 'better-sqlite3';

    if (isSqlite) {
      return {
        type: 'better-sqlite3',
        database: process.env.DB_DATABASE || './db.sqlite',
        synchronize: process.env.DB_SYNCHRONIZE === '1',
        autoLoadEntities: process.env.DB_AUTO_LOAD_ENTITIES === '1',
      };
    }

    return {
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '5432', 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,

      synchronize: process.env.DB_SYNCHRONIZE === '1',
      autoLoadEntities: process.env.DB_AUTO_LOAD_ENTITIES === '1',

      ssl: {
        rejectUnauthorized: false,
      },

      extra: {
        connectionTimeoutMillis: 5000,
      },
    };
  },
}),
