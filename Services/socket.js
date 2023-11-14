import socketIOClient from "socket.io-client";

// todo to ask nir what happend when the alert is resolve/false ect.. should the alert turn to false or emit the soket as well??

import "@env";
let socket;

export const initializeSocket = () => {
  socket = socketIOClient(process.env.SOCKET_IO_URL);

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

  socket.on("changeAlert", (socketData) => {
    console.log("Received data from server:", socketData);
    if (socketData && socketData.operationType) {
      // * case #1 operationType is insert

      if (socketData.operationType === "insert") {
        // * 1. if operationType is insert look inside fullDocument the user, if the user is matched to the user id return alert true else false.
        if (
          socketData.fullDocument &&
          socketData.fullDocument.user === currentUser._id
        ) {
          console.log("Alert true for insert");
          callback(true);
        } else {
          console.log("Alert false for insert");
          callback(false);
        }
        // * case #2 operationType is update
      } else if (socketData.operationType === "update") {
        // * 2. if operationType is update and user in the updatedFields is matched to the user id return alert true else false

        if (
          socketData.updateDescription?.updatedFields &&
          socketData.updateDescription?.updatedFields?.user === currentUser._id
        ) {
          console.log("updated Alert true !");
          callback(true);
        } else {
          console.log("updated Alert false !");
          callback(false);
        }
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
