// Assuming you have the necessary models and associations
const ChatUser = require('./models/ChatUser');
const Message = require('./models/Message');
const { Sequelize } = require('sequelize');
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
          // profileImage: message.sender.profileImage,
        },
        receiver: {
          username: message.receiver.username,
          // profileImage: message.receiver.profileImage,
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
const getProfileForUsername = async (username) => {
  try {
    const user = await ChatUser.findOne({
      attributes: ['profileImage'],
      where: {
        username: username,
      },
    });
    // console.log(user.profileImage);

    if (user) {
      return user.profileImage;
    } else {
      console.log('User not found');
      return null; 
    }
  } catch (error) {
    console.error('Error retrieving password:', error);
    return null; 
  }
};

const seedDatabase = async () => {
  try {
    // await sequelize.sync({ force: true }); // Drop and re-create tables

    const shaan = await ChatUser.findOne({ where: { username: 'shaan' } });
    const shaan3 = await ChatUser.findOne({ where: { username: 'shaan3' } });
    const shaan4 = await ChatUser.findOne({ where: { username: 'shaan4' } });

    if (!shaan || !shaan3 || !shaan4) {
      throw new Error('One or more users not found');
    }

    // Custom timestamps
    const currentTime = new Date();

    // Insert sample data with custom timestamps
    await Message.create({
      content: 'hi',
      messageType: 'text',
      timestamp: currentTime,
      senderId: shaan.id,
      receiverId: shaan3.id,
    });

    await Message.create({
      content: 'noice',
      messageType: 'text',
      timestamp: new Date(currentTime.getTime() + 1000),
      senderId: shaan3.id,
      receiverId: shaan.id,
    });

    await Message.create({
      content: 'bye',
      messageType: 'text',
      timestamp: new Date(currentTime.getTime() + 2000),
      senderId: shaan4.id,
      receiverId: shaan.id,
    });

    await Message.create({
      content: 'poda',
      messageType: 'text',
      timestamp: new Date(currentTime.getTime() + 3000),
      senderId: shaan.id,
      receiverId: shaan4.id,
    });

    console.log('Sample data inserted successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    // await sequelize.close();
  }
};

module.exports = {getProfileForUsername, seedDatabase, getMessagesAndProfileImage};