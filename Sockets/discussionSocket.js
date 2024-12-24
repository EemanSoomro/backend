const discussionSocket = (io) => {
  io.on('connection', (socket) => {
    console.log('a user connected');

    // Join a room based on the category
    socket.on('joinRoom', ({ username, avatar, category }) => {
      socket.join(category);
      console.log(`${username} joined ${category} room`);
    });

    // Listen for incoming chat messages
    socket.on('chatMessage', (messageData) => {
      // Emit the message to all clients in the same category room
      io.to(messageData.category).emit('chatMessage', messageData);
      console.log('Message received:', messageData);
    });

    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });
};

module.exports = discussionSocket;
