/*import PropDrillingDemo from './components/PropDrillingDemo'
import Navbar     from './components/Navbar'
import ThemedCard from './components/ThemedCard'
import AddInternForm from './components/AddInternForm'
import InternSearch from './components/InternSearch'
import ScoreStats from './components/ScoreStats'
import InternListWithCallback from './components/InternListWithCallback'
import './App.css'

function App() {
  return(
    <>
    <PropDrillingDemo />
    <div>
      <Navbar />
      <div style={{ padding: '16px' }}>
        <ThemedCard name="Rahul" score={92} />
        <ThemedCard name="Priya" score={78} />
        <ThemedCard name="Amit"  score={45} />
      </div>
    </div>

    <div>
      <Navbar />

      <div style={{ padding: '16px' }}>
        <AddInternForm />
        <ScoreStats />
        <InternListWithCallback />
        <InternSearch />
      </div>
    </div>
    </>
  )
  
}

export default App
*/
import Navbar                 from './components/Navbar'
import ScoreStats             from './components/ScoreStats'
import AddInternForm          from './components/AddInternForm'
import InternSearch           from './components/InternSearch'
import InternListWithCallback from './components/InternListWithCallback'

function App() {
  return (
    <div>
      <Navbar />
      <div style={{ padding: '16px' }}>
        <ScoreStats />
        <AddInternForm />
        <InternSearch />
        <InternListWithCallback />
      </div>
    </div>
  )
}

export default App

/*
Contexts store data that needs to be shared across multiple components.
Custom hooks keep reusable logic separate, making components cleaner.
Components focus on showing the UI and handling user interactions.
*/