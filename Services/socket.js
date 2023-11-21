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
    const updatedDocumentUser = socketData?.updatedDocument?.user;
    const isUpdatedFieldUserMatched =
      socketData?.updateDescription?.updatedFields?.user === currentUser._id;
    if (socketData) {
      // console.log("currentUser", currentUser);
      // console.log(
      //   "socket 1",
      //   socketData.updateDescription?.updatedFields &&
      //     socketData.updateDescription?.updatedFields?.user === currentUser._id
      // );
      // console.log(
      //   "socket 2",
      //   socketData?.updatedDocument?.user === currentUser._id
      // );

      // * to check for the Home screen how to update alert with implement isUpdatedFieldUserMatched // done
      // todo to check for the AlertScreen how to update the status with implement condition updatedDocumentUser

      console.log("socket 3 socketData", socketData);
      // * case #1 operationType is insert
      // * 2. if operationType is update and user in the updatedFields is matched to the user id return alert true else false
      if (isUpdatedFieldUserMatched) {
        callback(socketData.updatedDocument);
      } else {
        // console.log("updated Alert false !");
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
