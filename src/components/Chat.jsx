import React, { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
import { FaTimes } from 'react-icons/fa'
import { colors } from '../constants/colors'
import { useChatContext } from '../context/chatContext'
import { useUserContext } from '../context/userContext'
import ContactItem from './ContactItem'

const Chat = ({ socket }) => {
  const [message, setMessage] = useState('')
  const [roomId, setRoomId] = useState(null)
  const [deviceToken, setDeviceToken] = useState(null)
  const { user } = useUserContext()
  const { chats, setChats, showChat, setShowChat } = useChatContext()

  useEffect(() => {
    if (socket) {
      socket.on("join", (data) => {
        if (!chats[data.roomId]) {
          const duplicateChats = { ...chats };
          duplicateChats[data.roomId] = {
            ...data,
            message: [{ message: null, userId: user.id }],
            active: false
          };
          setChats(duplicateChats);
        }
      });
    }
  }, [chats, setChats, socket, user]);

  const AlwaysScrollToBottom = () => {
    const elementRef = useRef();
    useEffect(() => elementRef.current.scrollIntoView());
    return <div ref={elementRef} />;
  };

  const handleActiveNotification = (contactId) => {
    const duplicateChat = { ...chats }
    duplicateChat[contactId] = { ...duplicateChat[contactId], active: false }
    setChats(duplicateChat)
  }

  const handleContact = async (event, contactId, deviceToken) => {
    event.stopPropagation()
    setDeviceToken(deviceToken)
    handleActiveNotification(contactId)
    setRoomId(contactId)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    socket.emit('chat message', {
      user,
      from: user.id,
      to: roomId,
      message,
      deviceToken
    })
    setMessage('')
  }

  return (
    <Container
      backgroundColor={colors.white}
      borderColor={colors.shadowLight}
      className={showChat ? 'active' : ''}
    >
      <Header>
        <div>
          <Title onClick={() => setShowChat(true)} color={colors.primary}>Chat</Title>
        </div>
        {
          showChat ? (
            <Close onClick={() => setShowChat(false)}>
              <FaTimes size={24} />
            </Close>
          ) : null
        }
      </Header>
      <Body className={showChat ? 'active' : ''}>
        <ContactList borderColor={colors.shadowLight} onClick={() => setRoomId(null)}>
          {
            Object.entries(chats).map(([key, contact], index) => (
              <ContactItem
                key={index}
                active={roomId === contact.roomId ? true : false}
                contact={contact}
                onClick={(event) => handleContact(event, key, contact.deviceToken)}
              />
            ))
          }
        </ContactList>
        <MessagesWrapper backgroundColor={colors.gray}>
          {
            roomId ? (
              <>
                <Messages>
                  {
                    chats[roomId].message.map((message, index) => {
                      return message.message ? (
                        <ChatBox key={index} style={{ textAlign: user.id === message.userId ? 'right' : 'left' }}>
                          <ChatText>{message.message}</ChatText>
                        </ChatBox>
                      ) : null
                    })
                  }
                  <AlwaysScrollToBottom />
                </Messages>
                <Form>
                  <form onSubmit={handleSubmit}>
                    <Input type="text" value={message} onChange={(event) => setMessage(event.target.value)} />
                    <Button backgroundColor={colors.primary}>send</Button>
                  </form>
                </Form>
              </>
            ) : null
          }
        </MessagesWrapper>
      </Body>
    </Container>
  )
}

const ActiveContainer = `
  min-height: 400px;
  height: auto;
  width: 600px;
  z-index: 1;
`

const WidthHeight = `
  width: 100%;
  height: 100%;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  right: 10px;
  bottom: 0px;
  padding: .5rem 1rem;
  border: 1px solid ${props => props.borderColor};
  background-color: ${props => props.backgroundColor};
  font-size: .7rem;
  overflow-y: scroll;

  &.active {
    ${ActiveContainer}
  }
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Close = styled.div`
  cursor: pointer;
`

const Title = styled.h1`
  cursor: pointer;
  color: ${props => props.color};
`

const Body = styled.div`
  display: none;

  &.active {
    display: flex;
    padding: 1rem 0;
    ${WidthHeight}

    @media screen and (max-width: 650px) {
      flex-direction: column;
    }
  }
`

const ContactList = styled.div`
  flex: 0 30%;
  border-right: 1px solid ${props => props.borderColor};
  width: 100%;
  height: auto;

  @media screen and (max-width: 650px) {
    height: 100px;
    overflow: scroll;
    max-height: 100px;
  }
`

const MessagesWrapper = styled.div`
  position: relative;
  background-color: ${props => props.backgroundColor};
  flex: 1;
  overflow-y: scroll;
  ${WidthHeight}
`

const Messages = styled.div`
  height: 300px;
  max-height: 300px;
  overflow: scroll;
`

const ChatBox = styled.div`
  width: 100%;
  font-size: .8rem;
  padding: .5rem;
`

const ChatText = styled.span`
  padding: 1rem;
`

const Form = styled.div`
  padding-top: .5rem;

  form {
    width: 100%;
    display: flex;
  }
`

const Input = styled.input`
  width: 90%;
`

const Button = styled.button`
  margin-left: 1rem;
  background-color: ${props => props.backgroundColor};
  padding: 0 1rem;
`

export default Chat