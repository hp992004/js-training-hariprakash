import type { ReactNode } from 'react'

interface CardProps {
  title:     string
  children?: ReactNode
}

function Card({ title, children }: CardProps) {
  return (
    <div className="card">
      <h3 className="card-title">{title}</h3>
      {children && <div className="card-body">{children}</div>}
    </div>
  )
}

export default Card

/*
ReactNode represents anything that React can render, such as text, JSX, elements, or fragments.
It is the correct type for children because it allows the Card component to display any valid React content.
*/

/*
Use a required children prop when the component must always wrap some content.
Use an optional children prop when the component can work with or without child content.
*/