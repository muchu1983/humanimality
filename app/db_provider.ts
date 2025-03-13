import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite3';
import { promisify } from 'util';

// 建立資料庫連線
async function connectDB(): Promise<Database> {
  return open({
    filename: './example.db',
    driver: sqlite3.Database
  });
}

// 初始化資料表
async function initTable(db: Database): Promise<void> {
  try {
    const run = promisify(db.run.bind(db));
    await run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('Table created successfully');
  } catch (err) {
    console.error('Error creating table:', err);
  }
}

// CRUD 操作範例
async function main() {
  const db = await connectDB();
  
  try {
    // 初始化資料表
    await initTable(db);

    // 插入資料
    const insert = promisify(db.run.bind(db));
    await insert(
      'INSERT INTO users (name, email) VALUES (?, ?)',
      ['Alice', 'alice@example.com']
    );
    console.log('Inserted new user');

    // 查詢資料
    const all = promisify(db.all.bind(db));
    const users = await all('SELECT * FROM users');
    console.log('All users:', users);

    // 更新資料
    await insert(
      'UPDATE users SET email = ? WHERE name = ?',
      ['alice.new@example.com', 'Alice']
    );
    console.log('Updated user email');

    // 刪除資料
    await insert(
      'DELETE FROM users WHERE name = ?',
      ['Alice']
    );
    console.log('Deleted user');
    
  } catch (err) {
    console.error('Database error:', err);
  } finally {
    // 關閉連線
    const close = promisify(db.close.bind(db));
    await close();
  }
}

// 執行範例程式
main();
