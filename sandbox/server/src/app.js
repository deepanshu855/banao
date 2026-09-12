import express from 'express';
import morgan from 'morgan';

const app = express();

// Middleware
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.get('/api/sandbox/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Sandboxserver is healthy' });
});

export default app;