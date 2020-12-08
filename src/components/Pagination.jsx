import React from 'react'
import ReactPaginate from 'react-paginate'
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'
import styled from 'styled-components'
import { colors } from '../constants/colors'

const Pagination = ({ totalPages, forcePage, onChangePage }) => {
  return (
    <Container color={colors.primary}>
      <ReactPaginate
        previousLabel={<AiOutlineLeft />}
        nextLabel={<AiOutlineRight />}
        breakLabel={'...'}
        breakClassName={'break-me'}
        pageCount={totalPages}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={onChangePage}
        containerClassName={'pagination'}
        subContainerClassName={'pages pagination'}
        activeClassName={'active'}
        forcePage={forcePage}
      />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  font-size: 1.4rem;
  margin: 2rem 0;

  .pagination {
    display: flex;

    li {
      cursor: pointer;
      margin: 0 1rem;

      &.active {
        color: ${props => props.color}
      }
    }
  }
`

export default Pagination