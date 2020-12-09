import { useEffect } from "react";
import * as socketClient from "socket.io-client";
import { useChatContext } from "../context/chatContext";
import { useUserContext } from "../context/userContext";

const ENDPOINT = process.env.REACT_APP_SOCKET_URL;

let socket;

const useSocket = () => {
  const { user } = useUserContext();
  const { chats, setChats } = useChatContext();

  useEffect(() => {
    socket = socketClient(ENDPOINT, {
      path: "/mysocket",
    });
    if (user) {
      socket.emit("initial", { userId: user.id });
      socket.on("restore chat", (chats) => {
        setChats(chats);
      });
    }
    socket.on("error", function (err) {
      console.log("Socket.IO Error");
      console.log(err);
    });
  }, [setChats, user]);

  useEffect(() => {
    socket.on("chat message", ({ data, dataUser }) => {
      const duplicateChats = { ...chats };
      const { from, to, message } = data;

      if (!duplicateChats[to]) {
        duplicateChats[to] = {
          ...dataUser,
          message: [{ message, userId: from }],
          active: false,
        };
      } else {
        const messages = [
          ...duplicateChats[to].message,
          { message, userId: from },
        ];
        duplicateChats[to] = {
          ...duplicateChats[to],
          message: messages,
          active: user.id !== from ? true : false,
        };
      }
      setChats(duplicateChats);
    });

    return () => {
      socket.off("chat message");
    };
  }, [user, chats, setChats]);

  return { socket };
};

export default useSocket;
