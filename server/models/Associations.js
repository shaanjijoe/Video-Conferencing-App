// In a separate file for associations (e.g., associations.js)
const ChatUser = require('./ChatUser');
const Message = require('./Message');
const Group = require('./Group');

// Associate messages with sender and receiver
Message.belongsTo(ChatUser, { as: 'sender', foreignKey: 'senderId' });
Message.belongsTo(ChatUser, { as: 'receiver', foreignKey: 'receiverId' });

ChatUser.hasMany(Message, { foreignKey: 'senderId' });
ChatUser.hasMany(Message, { foreignKey: 'receiverId' });
Group.hasMany(Message, { foreignKey: 'groupId' });

