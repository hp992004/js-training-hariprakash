import InternCard from './InternCard'
import ProfileCard from './ProfileCard'
import InternProfile from './InternProfile'
import Card from './Card'
import Dashboard from './Dashboard'
import SelfLearning from './SelfLearning'
import type { Intern } from "./InternProfile"
import './App.css'



function App() {
    const rahul: Intern = {
  id: 1,
  name: "Rahul",
  score: 92,
  isPresent: true,
  skills: ["HTML", "CSS", "TypeScript", "React"],
}
const priya: Intern = {
  id: 2, name: 'Priya', score: 78, isPresent: true,
  skills: ['Node.js', 'TypeScript'],
}

  return (
    <div>
      <InternCard name="Rahul" score={92} isPresent={true} role="Frontend"  />
      
      <InternCard name="Priya" score={78} isPresent={true} role="Backend" />
      
      <InternCard name="Amit"  score={45} isPresent={false} role="UI/UX" />

      <ProfileCard name="Rahul" role="Frontend" score={92} />
      <ProfileCard name="Priya" />
      <ProfileCard />
      
      <InternProfile intern={rahul} />
      <InternProfile intern={priya} />
      <InternProfile intern={{ ...priya }} />

      <Card title="Rahul">
        <p>Score: 92</p>
        <p>Status: Present</p>
        <button>View Profile</button>
      </Card>

      <Card title="Announcements">
        <ul>
          <li>Session 3 tomorrow at 10am</li>
          <li>Submit PRs by EOD</li>
        </ul>
      </Card>

      <Card title="Empty Card" />

      <Dashboard/>

      <SelfLearning />
    </div>
  )
}

export default App


/*
Defining a separate Intern interface keeps the code organized and reusable.
The same data shape can be shared across multiple components.
This makes updates easier and avoids repeating the same type definitions.
*/

/*
The {...priya} syntax passes all object properties as props to the component.
It is useful for matching props but can reduce clarity if unnecessary props are passed.
*/