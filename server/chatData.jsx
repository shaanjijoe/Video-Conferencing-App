// Assuming you have the necessary models and associations
const ChatUser = require('./models/ChatUser');
const Message = require('./models/Message');

const getMessagesAndProfileImage = async (username) => {
  try {
    // Find the user by username
    const user = await ChatUser.findOne({
      where: { username },
    });

    if (!user) {
      console.log(`User with username ${username} not found.`);
      return;
    }

    // Find all messages sent or received by the user
    const messages = await Message.findAll({
      where: {
        [Sequelize.Op.or]: [
          { senderId: user.id },
          { receiverId: user.id },
        ],
      },
      include: [
        {
          model: ChatUser,
          as: 'sender',
          attributes: ['username', 'profileImage'], // Include sender's username and profileImage
        },
        {
          model: ChatUser,
          as: 'receiver',
          attributes: ['username', 'profileImage'], // Include receiver's username and profileImage
        },
      ],
      order: [['timestamp', 'ASC']], // Order by timestamp in ascending order
    });

    // Extract relevant data from messages
    const formattedMessages = messages.map((message) => {
      return {
        content: message.content,
        messageType: message.messageType,
        timestamp: message.timestamp,
        sender: {
          username: message.sender.username,
          profileImage: message.sender.profileImage,
        },
        receiver: {
          username: message.receiver.username,
          profileImage: message.receiver.profileImage,
        },
      };
    });

    // Return the formatted messages
    return formattedMessages;
  } catch (error) {
    console.error('Error retrieving messages:', error);
    throw error; // Handle the error as needed
  }
};

// Example usage
// const usernameInput = 'exampleUser';
// const result = await getMessagesAndProfileImage(usernameInput);

// console.log(result);
