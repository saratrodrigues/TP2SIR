import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import studentsRoutes from './routes/studentsRoutes.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = 3000;

const adapter = new JSONFile('db.json');
const db = new Low(adapter, { students: [] });

async function initializeDatabase() {
  await db.read();
  if (!db.data){
    db.data ||= { students: [] };
    await db.write();
  }
}

async function startServer(){
  await initializeDatabase();
  app.locals.db = db;

  app.use(express.json());
  app.use(express.static(path.join(__dirname, 'public')));
  app.use('/students', studentsRoutes);

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });

  app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'about.html'));
  });

  app.get('/doc', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'doc.html'));
  }); 

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}
  
startServer();