import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// Database file path: root/data/monitor.db
const DB_DIR = path.resolve(__dirname, '../data');
const DB_PATH = path.resolve(DB_DIR, 'monitor.db');

let dbInstance = null;

async function getDb() {
  if (dbInstance) return dbInstance;

  // Ensure directory exists (fs/promises import needed if we want to mkdir, 
  // but let's assume user/docker setup handles or we use fs-extra. 
  // Actually, standard fs is fine).
  const fs = await import('fs/promises');
  await fs.mkdir(DB_DIR, { recursive: true });

  dbInstance = await open({
    filename: DB_PATH,
    driver: sqlite3.Database
  });

  await dbInstance.exec(`
    CREATE TABLE IF NOT EXISTS channels (
      id TEXT PRIMARY KEY,
      url TEXT,
      rss TEXT,
      prompt_style TEXT,
      last_checked INTEGER
    );

    CREATE TABLE IF NOT EXISTS items (
      id TEXT PRIMARY KEY,
      channel_id TEXT,
      title TEXT,
      url TEXT,
      pub_date TEXT,
      summary TEXT,
      created_at INTEGER,
      FOREIGN KEY(channel_id) REFERENCES channels(id)
    );
  `);

  return dbInstance;
}

export async function getLastSeenVideo(channelId) {
  const db = await getDb();
  // Get the most recently created item for this channel
  const row = await db.get(
    'SELECT url FROM items WHERE channel_id = ? ORDER BY created_at DESC LIMIT 1',
    channelId
  );
  return row ? row.url : null;
}

export async function markAsRead(channelId, item) {
  const db = await getDb();
  await db.run(
    `INSERT OR IGNORE INTO items (id, channel_id, title, url, pub_date, created_at)
     VALUES (?, ?, ?, ?, ?, ?)`,
    item.id,
    channelId,
    item.title,
    item.link,
    item.pubDate,
    Date.now()
  );
  
  // Also update channel last_checked
  await db.run(
    'UPDATE channels SET last_checked = ? WHERE id = ?',
    Date.now(), channelId
  );
}

export async function initChannel(channel) {
  const db = await getDb();
  await db.run(
    `INSERT OR IGNORE INTO channels (id, url, rss, prompt_style, last_checked)
     VALUES (?, ?, ?, ?, ?)`,
    channel.id, channel.url, channel.rss, channel.prompt_style, 0
  );
}
