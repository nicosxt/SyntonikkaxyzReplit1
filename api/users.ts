import type { VercelRequest, VercelResponse } from '@vercel/node';
import { users, type User, type InsertUser } from '../shared/schema';

// In-memory storage for Vercel
let userStorage = new Map<number, User>();
let currentId = 1;

async function getUser(id: number): Promise<User | undefined> {
  return userStorage.get(id);
}

async function getUserByUsername(username: string): Promise<User | undefined> {
  return Array.from(userStorage.values()).find(
    (user) => user.username === username,
  );
}

async function createUser(insertUser: InsertUser): Promise<User> {
  const id = currentId++;
  const user: User = { ...insertUser, id };
  userStorage.set(id, user);
  return user;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    switch (req.method) {
      case 'GET':
        if (req.query.id) {
          const user = await getUser(Number(req.query.id));
          return res.status(200).json(user || null);
        }
        if (req.query.username) {
          const user = await getUserByUsername(String(req.query.username));
          return res.status(200).json(user || null);
        }
        return res.status(400).json({ error: 'Missing id or username parameter' });

      case 'POST':
        const newUser = await createUser(req.body);
        return res.status(201).json(newUser);

      default:
        return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}