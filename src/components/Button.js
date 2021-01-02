import React from 'react'

function SmallButton(props) {
  const { innerLabel, outerLabel, onClickAction, className } = props
  return (
    <div className={`btn ${className}`}>
      {outerLabel && <p className='btn__outerLabel'>{outerLabel}</p>}
      <button onClick={onClickAction}>{innerLabel}</button>
    </div>
  )
}

export default SmallButton
