const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

const authRoute = require('./routes/auth');
const userRoute = require('./routes/users');
const societyRoute = require('./routes/societies');
const eventRoute = require('./routes/events');
const projectRoute = require('./routes/projects');
const announcementRoute = require('./routes/announcements');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Serve static files (images) from the 'images/societies' folder
app.use('/images', express.static(path.join(__dirname, 'public/images')));


// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.log("DB connection error:", err));

// Routes
app.use('/api/announcements', announcementRoute);
app.use('/api/projects', projectRoute);
app.use('/api/events', eventRoute);
app.use('/api/societies', societyRoute);
app.use('/api/auth/users', userRoute);
app.use('/api/auth', authRoute);

// Server
const PORT = process.env.PORT || 8800;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
