import React from 'react'

import '../styles.css'

export default function Header(props) {
  return (
    <div className="header">
      {props.children}
    </div>
  )
}


