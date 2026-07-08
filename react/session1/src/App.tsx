import Greeting from './Greeting'
import TsxRules from './TsxRules'
import StyledCard from './StyledCard'
import Profile from './Profile'
import SkillList from './SkillList'
import ScoreCard from './ScoreCard'
import StatusBadge from './StatusBadge'
import InternCard from './InternCard'
import Dashboard from "./Dashboard";
import './App.css';

function App() {
  return (
    <>
      <h1>Hello React</h1>
      <Greeting />
      <TsxRules />
      <StyledCard/>
      <Profile />
      <SkillList/>
      <ScoreCard/>
      <StatusBadge/>
      <InternCard/>
      <Dashboard />
    </>
  )
}

export default App

