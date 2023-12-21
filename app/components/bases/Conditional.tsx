import React from 'react'

interface ConditionalProps {
  showWhen: boolean,
  children: React.ReactNode
}

const Conditional: React.FC<ConditionalProps> = ({ showWhen, children }) => {
  if (showWhen) return <>{children}</>

  return <></>
}

export default Conditional
