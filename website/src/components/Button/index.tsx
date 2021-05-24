import React, { MouseEventHandler } from 'react'

import './styles.css'

type Props = {
  children?: React.ReactNode
  onClick?: MouseEventHandler<HTMLButtonElement>
  type?: 'submit' | 'reset' | 'button'
  className?: string
  disabled?: boolean
}

export default function Button (props: Props) {
  return <button
    className={'Button' + (props.className ? ' ' + props.className : '')}
    onClick={props.onClick}
    type={props.type || 'button'}
    disabled={props.disabled}
  >
    {props.children}
  </button>
}
