import React from "react"
import ContentLoader, { Code } from "react-content-loader"

const Skeleton = (props) => {
  if (props.type === "code") return <Code />

  return (
    <ContentLoader
      speed={2}
      width={476}
      height={124}
      viewBox="0 0 476 124"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      {...props}
    >
      <circle cx="46" cy="38" r="38"></circle>
      <rect x="34" y="83" rx="5" ry="5" width="25" height="10"></rect>
      <rect x="547" y="222" rx="5" ry="5" width="220" height="10"></rect>
      <rect x="82" y="150" rx="5" ry="5" width="220" height="10"></rect>
      <circle cx="137" cy="38" r="38"></circle>
      <rect x="124" y="83" rx="5" ry="5" width="25" height="10"></rect>
      <circle cx="228" cy="38" r="38"></circle>
      <rect x="215" y="83" rx="5" ry="5" width="25" height="10"></rect>
      <circle cx="320" cy="38" r="38"></circle>
      <rect x="307" y="83" rx="5" ry="5" width="25" height="10"></rect>
      <circle cx="410" cy="38" r="38"></circle>
      <rect x="398" y="83" rx="5" ry="5" width="25" height="10"></rect>
    </ContentLoader>
  )
}

export default Skeleton
