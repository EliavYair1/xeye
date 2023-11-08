import socketIOClient from "socket.io-client";

const socket = socketIOClient("address....");
socket.on("connect", () => {
  const dataToSend = {
    key1: "value1",
    key2: "value2",
  };
  socket.emit("initial_data", dataToSend);
});
socket.on("server_response", (data) => {
  console.log("Received data from server:", data);
});

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    socket.on("message", (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

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
        <Text key={index}>{msg}</Text>
      ))}
      <TextInput value={message} onChangeText={(text) => setMessage(text)} />
      <Button title="Send" onPress={sendMessage} />
    </View>
  );
};

export default Chat;
