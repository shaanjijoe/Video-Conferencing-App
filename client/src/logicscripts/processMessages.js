function processMessages(texts, usernameOG) {
    const userMessages = {};
  
    // Process messages and organize them based on sender/receiver
    texts.forEach((message) => {

    const isClient = message.sender.username === usernameOG;

      const otherUser = message.sender.username === usernameOG ? message.receiver.username : message.sender.username;
  
      if (!userMessages[otherUser]) {
        userMessages[otherUser] = [];
      }
  
      userMessages[otherUser].push({
        content: message.content,
        messageType: message.messageType,
        timestamp: message.timestamp,
        isClient,
      });
    });
  
    // Convert to array and sort based on the latest message timestamp
    const sortedMessages = Object.entries(userMessages).map(([username, messages]) => ({
      username,
      messages: messages.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)),
    }));
    // const sortedMessages = userMessages;
  
    // Sort the array based on the timestamp of the latest message
    const sortedArray = sortedMessages.sort((a, b) => {
        const latestMessageA = a.messages[a.messages.length - 1];
        const latestMessageB = b.messages[b.messages.length - 1];
      return new Date(latestMessageB.timestamp) - new Date(latestMessageA.timestamp);
    });
  
    return sortedArray;
  }

  export default processMessages;