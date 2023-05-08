import request from 'supertest';
import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';

// Import your routes here
import clientRoutes from '../routes/client';
import generalRoutes from '../routes/general';
import managementRoutes from '../routes/management';
import salesRoutes from '../routes/sales';

// Load environment variables
dotenv.config();

// Create an Express app
const app = express();

// Configure the app
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// Use your routes
app.use('/client', clientRoutes);
app.use('/general', generalRoutes);
app.use('/management', managementRoutes);
app.use('/sales', salesRoutes);

// Unit tests
describe('Express App Configuration', () => {
  it('should parse JSON in request body', async () => {
    const response = await request(app)
      .post('/')
      .send({ message: 'Hello World' });
    expect(response.status).toBe(404);
  });

  it('should use helmet middleware', async () => {
    const response = await request(app).get('/');
    expect(response.headers['x-dns-prefetch-control']).toBe('off');
  });

  it('should use CORS middleware', async () => {
    const response = await request(app).get('/');
    expect(response.headers['access-control-allow-origin']).toBe('*');
  });
});
