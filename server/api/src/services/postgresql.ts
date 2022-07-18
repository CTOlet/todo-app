import { Pool } from 'pg';

const pg = new Pool({
  user: 'admin',
  password: 'admin',
  host: 'database',
  port: 5432,
  database: 'postgres',
});

export { pg };
