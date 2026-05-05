// server.js
const app = require('./src/app'); 
// FIX: Point to the src folder where your config resides
const sequelize = require('./src/config/database'); 
require('dotenv').config();

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    // Requirement 4.3: Initialize Database Connection
    await sequelize.authenticate();
    console.log('✅ Connection has been established successfully.');

    // Requirement 4.4: Sync models (including Vitals) to PostgreSQL
    await sequelize.sync({ alter: true });
    console.log('✅ Database models synchronized.');

    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
    process.exit(1); // Exit process on database failure
  }
};

startServer();