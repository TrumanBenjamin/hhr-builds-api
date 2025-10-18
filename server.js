require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./docs/swagger');
const { connect } = require('./db/db');

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// routes
app.use('/api/builds', require('./routes/builds'));

// docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, { explorer: true }));

// health
app.get('/', (req, res) => res.send('HHR Builds API OK'));

// start
const port = process.env.PORT || 3000;
connect(process.env.MONGODB_URI, process.env.DB_NAME)
  .then(() => {
    app.listen(port, () => console.log(`Server running on :${port}`));
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
  });