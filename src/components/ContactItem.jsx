import React from 'react'
import styled from 'styled-components'
import { AiOutlineBell } from 'react-icons/ai'
import { ReactComponent as PlaceholderProfile } from '../assets/profile.svg'
import { colors } from '../constants/colors'

const ContactItem = ({ contact, active, onClick }) => {
  return (
    <Container
      color={colors.secondary}
      active={active}
      onClick={onClick}
    >
      {
        contact.avatar ? (
          <img
            style={{ borderRadius: '50%' }}
            height={30}
            width={30}
            src={`${process.env.REACT_APP_API_URL}/uploads/avatar/${contact.avatar}`}
            alt={contact.name}
          />
        ) : (
            <PlaceholderProfile style={{ width: '30px', height: '30px' }} />
          )
      }
      <ContactName>{contact.name}</ContactName>
      {
        contact.active ? (
          <AiOutlineBell size={20} style={{ marginLeft: '0.5rem' }} />
        ) : null
      }
    </Container>
  )
}

const Container = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  color: ${props => props.active ? props.color : ''};
`

const ContactName = styled.span`
  font-size: 1rem;
  margin-left: .5rem;
`

export default ContactItem