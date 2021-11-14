import { createConnection } from 'typeorm';

export const dbConnection = createConnection({
   "type": "postgres",
   "host": "db",
   "port": 5432,
   "username": "me",
   "password": "password",
   "database": "news",
   "synchronize": true,
   "logging": false,
   "entities": [
      "src/entity/**.js"
   ],
});
