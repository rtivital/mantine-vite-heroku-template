import * as express from 'express';
import * as path from 'path';
import * as ssl from 'express-sslify';

const app = express();

app.use(ssl.HTTPS({ trustProtoHeader: true }));

app.get('/assets/*', (req, res) => {
  res.sendFile(req.originalUrl.endsWith('/') ? req.originalUrl.slice(-1) : req.originalUrl, {
    root: __dirname,
  });
});

app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, './index.html'));
});

app.listen(process.env.PORT || 5173, () => {
  process.stdout.write(`App is running: http://localhost:${process.env.PORT || 5173}\n`);
});
