import { useEffect, useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import socketIOClient from "socket.io-client";

// http://44.205.124.203:5000/
// to connect to the backend socket i need to pass when login the ip
const socket = socketIOClient("http://44.205.124.203:5000/");
socket.on("connect", () => {
  const dataToSend = {
    // to send the userId
    key1: "value1",
  };
  socket.emit("initial_data", dataToSend);
});

socket.on("server_response", (data) => {
  console.log("Received data from server:", data);
});

const SocketConnection = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    socket.on("message", (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });
    // ? happend when log out the application
    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (message) {
      socket.emit("message", message);
      setMessage("");
    }
  };

  return (
    <View>
      {messages.map((msg, index) => (
        <Text key={index} style={{ color: "white" }}>
          {msg}
        </Text>
      ))}
      <TextInput
        value={message}
        onChangeText={(text) => setMessage(text)}
        style={{ backgroundColor: "white" }}
      />
      <Button title="Send" onPress={sendMessage} />
    </View>
  );
};

export default SocketConnection;
