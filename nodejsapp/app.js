const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello Sir shubham this side, Node.js inside Docker!');
});

app.listen(port, () => {
  console.log(`App running at http://localhost:${port}`);
});
