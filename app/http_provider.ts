import express from 'express'
const app = express();
const port = 8080;

// 定义路由
app.get('/', (req, res) => {
  res.send('Hello World from TypeScript');
});

// 启动服务器
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});