import useInternSearch from '../hooks/useInternSearch'
import { useInterns } from '../contexts/intern-context'
import ThemedCard from './ThemedCard'
function InternSearch() {
  const { interns, isLoading } = useInterns()
  const { search, setSearch, filtered, stats } = useInternSearch(interns)

  if (isLoading) {
    return <p>Loading...</p>
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Search intern..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <p>Total Interns: {stats.total}</p>
      <p>Present: {stats.present}</p>
      <p>Average Score: {stats.avg}</p>

      {filtered.map((intern) => (
        <ThemedCard
        key={intern.id}
        name={intern.name}
        score={intern.score}
        />
      ))}
    </div>
  )
}

export default InternSearch