import React, { MouseEventHandler } from 'react'

import './styles.css'

type Props = {
  children?: React.ReactNode
  onClick?: MouseEventHandler<HTMLButtonElement>
  type?: 'submit' | 'reset' | 'button'
}

export default function Button (props: Props) {
  return <button
    className="Button"
    onClick={props.onClick}
    type={props.type || 'button'}
  >
    {props.children}
  </button>
}
