const express = require('express');
const connectDB = require('./config/db');
require('dotenv').config();
const swaggerUI = require('swagger-ui-express');
const swaggerConfig = require('./config/swagger');
const errorHandler = require('./middleware/errorHandler');
const logger = require('./utils/logger');

const app = express();
const PORT = process.env.PORT || 8000;

//connect to MongoDB
connectDB();

//body parser middleware to parse JSON request bodies
app.use(express.json());

//swagger Documentation
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerConfig));

//routes
app.use('/api', require('./routes/authRoutes'));
app.use('/api/items', require('./routes/itemRoutes'));

//error Handler (if endpoint didn't match)
app.use((req, res) => {
  res.status(404).json({ message: 'Endpoint not found' });
});

//global error handler
app.use(errorHandler);

//start  the server
const server = app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
});

//handle errors during server startup
server.on('error', (error) => {
  logger.error('Server failed to start', { error });

  if (error.code === 'EADDRINUSE') {
    logger.error(`Port ${PORT} is already in use.`);
  }

  process.exit(1);
});