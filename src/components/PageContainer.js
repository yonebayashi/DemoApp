import React from 'react'

import '../styles.css'

export default function PageContainer(props) {
  return (
    <div className="page-container">
      {props.children}
    </div>
  )
}


