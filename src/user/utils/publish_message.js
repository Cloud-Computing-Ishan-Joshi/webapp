async function publishOrderedMessage(topicNameOrId, data, orderingKey=undefined) {

    // use the global pubSubClient object
    const pubSubClient = global.pubSubClient;

    // Publishes the message as a string, e.g. "Hello, world!" or JSON.stringify(someObject)
    const dataBuffer = Buffer.from(data);
  
    // Be sure to set an ordering key that matches other messages
    // you want to receive in order, relative to each other.
    const message = {
      data: dataBuffer,
    //   orderingKey: orderingKey,
    };
  
    const publishOptions = {
    //   messageOrdering: true,
    };
  
    // Publishes the message
    const messageId = await pubSubClient
      .topic(topicNameOrId, publishOptions)
      .publishMessage(message);
  
    console.log(`Message ${messageId} published.`);
  
    return messageId;
}

module.exports = publishOrderedMessage;