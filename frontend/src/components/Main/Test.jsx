import React from 'react'

const Test = (props) => {

    console.log(props)
  return (
    <div>
      TEST {props.match.params.number}
    </div>
  )
}

export default Test