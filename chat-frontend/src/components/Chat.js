import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
// import axios from 'axios';

function Chat({ token }) {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  useEffect(() => {
    // const fetchChatHistory = async () => {
    //   try {
    //     const response = await axios.get('http://localhost:3000/chat/history', {
    //       headers: { Authorization: `Bearer ${token}` },
    //     });
    //     setMessages(response.data);
    //   } catch (error) {
    //     console.error('Error fetching chat history:', error);
    //   }
    // };

    // fetchChatHistory();

    const newSocket = io('http://localhost:3000', {
      auth: { token },
    });
    setSocket(newSocket);

    newSocket.on('message', (message) => {
      console.log(message, "data")
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => newSocket.close();
  }, [token]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (inputMessage && socket) {
      socket.emit('message', inputMessage);
      setInputMessage('');
    }

    console.log("hello")
  };

  return (
    <div>
      <h1>Send message to everyone who connected to the server</h1>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
      <div className="chat">
        {messages.map((msg, index) => (
          <div key={index}>{msg.username}:{msg.message}</div>
        ))}
      </div>
    </div>
  );
}

export default Chat;
