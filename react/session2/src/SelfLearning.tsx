/*
React.FC is a type used to define a React function component with props.
It specifies the component's props through a generic type like React.FC<MyProps>.
Typing the props parameter directly only checks the props argument.
React.FC types the entire component instead of just its parameters.
Both approaches work, but typing the props parameter is more common in modern React.
*/

/*
PropsWithChildren automatically adds an optional children prop to your props type.
It removes the need to manually declare children: ReactNode.
It is useful when a component accepts child content by default.
Manually adding ReactNode gives more control over whether children is required or optional.
*/

/*
The key prop is used by React to identify elements in a list during rendering.
It helps React update, add, or remove items efficiently without re-rendering everything.
The key is only used internally by React and is not passed to the component as a prop.
If a component needs the same value, pass it again using a different prop name.
*/

import type { ReactNode } from 'react'

interface PageLayoutProps {
  header:   ReactNode
  children: ReactNode
  footer:   ReactNode
}

function PageLayout({ header, children, footer }: PageLayoutProps) {
  return (
    <div>
      <header style={{ background: '#f0f0f0', padding: '12px' }}>{header}</header>
      <main   style={{ padding: '16px' }}>{children}</main>
      <footer style={{ background: '#f0f0f0', padding: '12px' }}>{footer}</footer>
    </div>
  )
}

<PageLayout
  header={<h1>Intern Dashboard</h1>}
  footer={<p>© 2026 Aarvihsolutions</p>}
>
  <p>Main content goes here as children.</p>
  <p>Any JSX works — text, elements, or other components.</p>
</PageLayout>

/*
Children are passed between the opening and closing tags of a component.
Named props like header or footer place content in specific predefined sections.
Use named slots when a component has multiple fixed content areas instead of one main content area.
*/

import type { ReactElement } from "react"

interface WrapperProps {
  content: ReactNode
}

function Wrapper({ content }: WrapperProps) {
  return <div>{content}</div>
}

interface IconButtonProps {
  icon: ReactElement
  label: string
}

function IconButton({ icon, label }: IconButtonProps) {
  return (
    <button>
      {icon} {label}
    </button>
  )
}

interface TooltipProps {
  trigger: ReactElement
  tip: string
}

function Tooltip({ trigger, tip }: TooltipProps) {
  return <span title={tip}>{trigger}</span>
}

function SelfLearning() {
  return (
    <>
      <Wrapper content="Hello ReactNode" />
      <Wrapper content={<strong>ReactNode accepts JSX too</strong>} />

      <IconButton icon={<span>★</span>} label="Favorite" />

      <Tooltip trigger={<button>Hover Me</button>} tip="This is a tooltip" />

    </>
  )
}

export default SelfLearning

/*
ReactNode accepts anything React can render, including text, numbers, JSX, null, and arrays.
ReactElement and JSX.Element are stricter and only accept JSX elements.
Use ReactNode for flexible content and ReactElement/JSX.Element when a real element is required.
*/

/*
ReactNode is used for flexible content that can be anything React can render.
ReactElement is used when a prop must receive a valid JSX element.
JSX.Element is similar to ReactElement and is used when null or undefined should not be allowed.
*/