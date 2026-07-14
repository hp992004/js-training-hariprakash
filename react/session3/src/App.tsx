import Counter from './Counter'
import StateTypes from './StateTypes'
import InternForm from './InternForm'
import TogglePanel from './TogglePanel'
import InternObjectForm from './InternObjectForm'
import InternList from './InternList'
import InternLoader from './InternLoader'
import FilteredInterns from './FilteredInterns'
import EscapeHandler from './EscapeHandler'
import FocusInput from './FocusInput'
import RefVsState from './RefVsState'
import StopwatchRef from './StopwatchRef'
import Dashboard from './Dashboard'
import LiveTimer from './SelfLearning'
import './App.css'

function App() {
  return (
    <div>
      <Counter />
      <StateTypes />
      <InternForm />
      <TogglePanel />
      <InternObjectForm />
      <InternList />
      <InternLoader />
      <FilteredInterns />
      <EscapeHandler />
      <FocusInput />
      <RefVsState />
      <StopwatchRef />
      <Dashboard />
      <LiveTimer />
    </div>
  )
}


export default App
