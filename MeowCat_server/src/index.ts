import express from 'express';

const app = express();

app.get('/test', (req, res) => {
  res.send("You're good");
});

app.listen(8000, () => {
  console.log('Server started');
});
