const express = require('express');
const app = express();
const ForumRoutes = require('./routes/ForumRoutes');
const ThreadRoutes = require('./routes/ThreadRoutes');
const UserRoutes = require('./routes/UserRoutes');
const DependencyConfig = require('./configs/DependencyConfig')

// DEPENDENCIES CONFIGURATION
new DependencyConfig(app)

// ALL ROUTES
new ForumRoutes(app);
new ThreadRoutes(app);
new UserRoutes(app);

// INVALID URL
app.get('*', async (req, res) => {
  await res.status(404).send('Page not found!');
});

// SERVER
const PORT = process.env.PORT || 3200;
app.listen(PORT, console.log(`SERVER IS RUNNING AT PORT ${PORT}`));