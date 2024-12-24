const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const http = require('http');
const { Server } = require('socket.io');
const discussionRoutes = require('./routes/discussionRoutes');
const discussionSocket = require('./sockets/discussionSocket');

dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

app.use(cors());
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'public/images')));

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('DB connection error:', err));

// Fix: Ensure the route path matches what the frontend is calling
app.use('/api/discussions', discussionRoutes);

discussionSocket(io);

const PORT = process.env.PORT || 8800;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
