// Function to add (create) a new user
const User = require('./models/User')
const ChatUser = require('./models/ChatUser')

const addUser = async (username, password, profileImage) => {
    try {
      const newUser = await User.create({
        username: username,
        password: password,
      });

      const newChatUser = await ChatUser.create({
        username: username,
        profileImage: profileImage
      });
  
      console.log('User created:', newUser.toJSON());
      console.log('ChatUser created:', newChatUser.toJSON());
      return true;
    } catch (error) {
      console.error('Error creating user:', error);
      return false;
    }
  };


// Function to edit (update) a user's password
const editUserPassword = async (username, newPassword) => {
    try {
      const user = await User.findOne({
        where: {
          username: username,
        },
      });
  
      if (user) {
        // Update the user's password
        user.password = newPassword;
        await user.save();
  
        console.log('User updated:', user.toJSON());
      } else {
        console.log('User not found');
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };
  
 // Function to delete a user
const deleteUser = async (username) => {
    try {
      const deletedUser = await User.destroy({
        where: {
          username: username,
        },
      });
  
      if (deletedUser) {
        console.log('User deleted successfully');
      } else {
        console.log('User not found');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };
  
 // Function to get password for a username and return the data
const getPasswordForUsername = async (username) => {
    try {
      const user = await User.findOne({
        attributes: ['password'],
        where: {
          username: username,
        },
      });
  
      if (user) {
        return user.password;
      } else {
        console.log('User not found');
        return null; 
      }
    } catch (error) {
      console.error('Error retrieving password:', error);
      return null; 
    }
  };

module.exports = {
    addUser,
    editUserPassword,
    deleteUser,
    getPasswordForUsername,
  };


//   const userFunctions = require('./userFunctions');

// // Example usage
// userFunctions.addUser('newUser', 'newSecurePassword');
// userFunctions.editUserPassword('existingUser', 'newPassword');
// userFunctions.deleteUser('userToDelete');
// const password = await userFunctions.getPasswordForUsername('existingUser');
// if (password !== null) {
//   console.log('Password:', password);
// }