import { useContext, createContext, useState } from "react";

const ChatContext = createContext({});

export const useChatContext = () => {
  return useContext(ChatContext);
};

const initialState = {};

const ChatProvider = ({ children }) => {
  const [chats, setChats] = useState(initialState);
  const [showChat, setShowChat] = useState(false);

  return (
    <ChatContext.Provider
      value={{
        chats,
        setChats,
        showChat,
        setShowChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatProvider;
