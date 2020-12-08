import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import styled from 'styled-components'
import {
  AiOutlineMenuFold,
  AiOutlineSearch,
  AiOutlineLogin,
  AiOutlineLogout,
  AiOutlineMedicineBox,
  AiOutlineProfile
} from 'react-icons/ai'
import { FaTimes } from 'react-icons/fa'
import { colors } from '../constants/colors'
import { useUserContext } from '../context/userContext'
import fetchApi from '../lib/fetchApi'

const Navbar = () => {
  const { user, setUser } = useUserContext()
  const history = useHistory()
  const [textSearch, setTextSearch] = useState('')
  const [isShowNav, setIsShowNav] = useState(false)

  const handleLogout = async () => {
    const { success } = await fetchApi('/api/auth/logout', {
      method: "POST",
      credentials: 'include',
    })

    if (success) {
      setUser(null)
      setIsShowNav(false)
      history.push('/')
    }
  }

  const handleSearch = async (event) => {
    event.preventDefault()
    history.push(`/product/search/${textSearch}/1`)
  }

  return (
    <>
      <Nav className="container">
        <LogoWrapper>
          <AiOutlineMenuFold style={{ cursor: 'pointer' }} size={25} onClick={() => setIsShowNav(true)} />
          <Link to="/">
            <Logo color={colors.secondary}>Deal</Logo>
          </Link>
        </LogoWrapper>
        <Menu>
          <ListMenu>
            <AiOutlineSearch />
            <form onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="What you interest?"
                value={textSearch}
                onChange={event => setTextSearch(event.target.value)}
              />
            </form>
          </ListMenu>
        </Menu>
      </Nav>
      <NavSlide borderColor={colors.shadowLight} color={colors.white} style={{ transform: isShowNav ? 'translateY(0)' : '' }}>
        <SlideHeader>
          <Link to="/">
            <HeaderTitle color={colors.secondary}>Deal</HeaderTitle>
          </Link>
          <FaTimes style={{ cursor: 'pointer' }} size={30} onClick={() => setIsShowNav(false)} />
        </SlideHeader>
        <SlideContent>
          {
            user ? (
              <>
                <SlideList to="/post">
                  <AiOutlineMedicineBox />
                  <span>Post</span>
                </SlideList>
                <SlideList to="/profile/1">
                  <AiOutlineProfile />
                  <span>Profile</span>
                </SlideList>
                <SlideListNonLink onClick={handleLogout}>
                  <AiOutlineLogout />
                  <span>Logout</span>
                </SlideListNonLink>
              </>
            ) : (
                <SlideList to="/login">
                  <AiOutlineLogin />
                  <span>Login</span>
                </SlideList>
              )
          }
        </SlideContent>
      </NavSlide>
    </>
  )
}

const Nav = styled.nav`
  font-size: 1.2rem;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  flex: 0 70%;

  @media screen and (max-width: 768px) {
    flex: 0 50%;
  }
`

const Logo = styled.h1`
  color: ${props => props.color};
  margin-left: 1rem;
`

const Menu = styled.ul`
  flex: 1;
`

const ListMenu = styled.li`
  position: relative;

  svg {
    left: .5rem;
    top: 50%;
    transform: translateY(-50%);
    position: absolute;
  }

  input {
    padding-left: 2rem;
  }
`

const NavSlide = styled.div`
  z-index: 1;
  position: fixed;
  top: 0;
  left: 0;
  box-shadow: 0 8px 30px ${props => props.borderColor};
  background-color: ${props => props.color};
  font-size: 1.4rem;
  width: 23rem;
  height: 100vh;
  transition: transform .5s ease;
  transform: translateX(-100%);
  padding: 1rem 2rem;

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`

const SlideHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const HeaderTitle = styled.h1`
  color: ${props => props.color};
`

const SlideContent = styled.ul`
  padding-top: 2rem;
`

const SlideList = styled(Link)`
  margin: 2rem 0;
  display: flex;
  align-items: center;

  span {
    margin-left: 1rem;
  }
`

const SlideListNonLink = styled.div`
  margin: 2rem 0;
  cursor: pointer;
  display: flex;
  align-items: center;

  span {
    margin-left: 1rem;
  }
`

export default Navbar