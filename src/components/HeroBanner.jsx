import React from 'react'
import styled from 'styled-components'
import { colors } from '../constants/colors'

const HeroBanner = () => {
  return (
    <Container color={colors.black}>
      <Wrapper className="container">
        <TitleWrapper>
          <Title>Deal with your interesting.</Title>
          <SubTitle>Search it for your own</SubTitle>
        </TitleWrapper>
        <DealWrapper>
        </DealWrapper>
      </Wrapper>
    </Container>
  )
}

const Container = styled.div`
  font-size: 1.2rem;
  color: #fff;
  background-color: ${props => props.color};
`
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  height: 250px;

  @media screen and (max-width: 768px) {
    height: 200px;
  }
`

const TitleWrapper = styled.div`
  flex: 0 40%;
  line-height: 1.6;

  @media screen and (max-width: 768px) {
    flex: 0 100%;
  }
`

const Title = styled.h2`
  letter-spacing: 2px;
`

const SubTitle = styled.h4``

const DealWrapper = styled.div`
  flex: 1;
`

export default HeroBanner