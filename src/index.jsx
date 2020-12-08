import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ChatProvider from './context/chatContext';
import UserProvider from './context/userContext';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <ChatProvider>
        <App />
      </ChatProvider>
    </UserProvider>
  </React.StrictMode>,
  document.getElementById('root')
);