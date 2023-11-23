import socketIOClient from "socket.io-client";
let socket;
export const initializeSocket = (url) => {
  console.log("trying to connect socket", url);
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
    console.log("socketData", socketData);
    if (socketData) {
      const updatedDocumentUser = socketData?.updatedDocument?.user;
      const isUpdatedFieldUserMatched = updatedDocumentUser === currentUser._id;
      // * to check for the Home screen how to update alert with implement isUpdatedFieldUserMatched // done
      // * case #1 operationType is insert
      // * 2. if operationType is update and user in the updatedFields is matched to the user id return alert true else false
      if (isUpdatedFieldUserMatched) {
        callback(
          socketData.updatedDocument.status === "assigned" ||
            socketData.updatedDocument.status === "accepted"
            ? socketData.updatedDocument
            : false
        );
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
