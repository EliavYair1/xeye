import socketIOClient from "socket.io-client";
let socket;
export const initializeSocket = (url) => {
  socket = socketIOClient(url);
  socket.on("connect", () => {
    console.log("Socket connected!");
  });
  socket.on("disconnect", () => {
    console.log("Socket disconnected!");
  });

  return socket;
};

export const subscribeToChangeAlert = (currentUser, callback) => {
  if (!socket) {
    console.error("Socket not initialized");
    return;
  }

  socket.on("updatedAlert", (socketData) => {
    // console.log("update alert", socketData);
    if (socketData) {
      console.log("currentUser", currentUser);
      // * case #1 operationType is insert
      // * 2. if operationType is update and user in the updatedFields is matched to the user id return alert true else false
      if (
        socketData.updateDescription?.updatedFields &&
        socketData.updateDescription?.updatedFields?.user === currentUser._id
      ) {
        callback(socketData.updatedDocument);
      } else {
        console.log("updated Alert false !");
        callback(false);
      }
    }
  });
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
