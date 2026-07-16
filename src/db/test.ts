import { db } from './index';
import { userTable } from './schema';

await db.insert(userTable).values({
  username: 'Jeison',
  id: 25252525,
  email: 'jeison@test.com',
  password: '123456'
});

const users = await db.select().from(userTable);

console.log(users);