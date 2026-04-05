import express from "express";
import { createServer as createViteServer } from "vite";
import cors from "cors";
import path from "path";
import { open } from "sqlite";
import sqlite3 from "sqlite3";
import bcrypt from "bcryptjs";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // Initialize SQLite Database
  const db = await open({
    filename: './database.sqlite',
    driver: sqlite3.Database
  });

  // Create tables if they don't exist
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      name TEXT,
      email TEXT UNIQUE,
      password TEXT
    );

    CREATE TABLE IF NOT EXISTS logs (
      id TEXT PRIMARY KEY,
      userId TEXT,
      tanggal TEXT,
      waktu TEXT,
      makanan TEXT,
      minuman TEXT,
      porsi TEXT,
      gejala TEXT,
      nyeri INTEGER,
      kondisi TEXT,
      catatan TEXT,
      FOREIGN KEY(userId) REFERENCES users(id)
    );
  `);

  // API Routes
  app.post('/api/register', async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const existingUser = await db.get('SELECT * FROM users WHERE email = ?', [email]);
      if (existingUser) {
        return res.status(400).json({ error: 'Email sudah terdaftar' });
      }
      
      const id = crypto.randomUUID();
      const hashedPassword = await bcrypt.hash(password, 10);
      
      await db.run(
        'INSERT INTO users (id, name, email, password) VALUES (?, ?, ?, ?)',
        [id, name, email, hashedPassword]
      );
      
      res.json({ id, displayName: name, email });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Terjadi kesalahan server' });
    }
  });

  app.post('/api/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await db.get('SELECT * FROM users WHERE email = ?', [email]);
      
      if (!user) {
        return res.status(401).json({ error: 'Email atau password salah' });
      }
      
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(401).json({ error: 'Email atau password salah' });
      }
      
      res.json({ id: user.id, displayName: user.name, email: user.email });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Terjadi kesalahan server' });
    }
  });

  app.get('/api/logs', async (req, res) => {
    try {
      const { userId } = req.query;
      if (!userId) return res.status(400).json({ error: 'userId required' });
      
      const logs = await db.all('SELECT * FROM logs WHERE userId = ? ORDER BY tanggal DESC', [userId]);
      
      // Parse gejala back to array
      const parsedLogs = logs.map(log => ({
        ...log,
        gejala: JSON.parse(log.gejala)
      }));
      
      res.json(parsedLogs);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Terjadi kesalahan server' });
    }
  });

  app.post('/api/logs', async (req, res) => {
    try {
      const log = req.body;
      const id = crypto.randomUUID();
      
      await db.run(`
        INSERT INTO logs (id, userId, tanggal, waktu, makanan, minuman, porsi, gejala, nyeri, kondisi, catatan)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, [
        id, 
        log.userId, 
        log.tanggal, 
        log.waktu, 
        log.makanan, 
        log.minuman, 
        log.porsi, 
        JSON.stringify(log.gejala), 
        log.nyeri, 
        log.kondisi, 
        log.catatan
      ]);
      
      res.json({ id, ...log });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Terjadi kesalahan server' });
    }
  });

  app.delete('/api/logs/:id', async (req, res) => {
    try {
      await db.run('DELETE FROM logs WHERE id = ?', [req.params.id]);
      res.json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Terjadi kesalahan server' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
