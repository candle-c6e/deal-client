import React from 'react'
import NukaCarousel from 'nuka-carousel'

const Carousel = ({ children, autoplay = true, slidesToShow = 1 }) => {
  return (
    <NukaCarousel
      renderBottomCenterControls={null}
      renderCenterLeftControls={({ previousSlide }) => null}
      renderCenterRightControls={({ nextSlide }) => null}
      autoplay={autoplay}
      slidesToShow={slidesToShow}
    >
      {children}
    </NukaCarousel>
  )
}

export default Carousel