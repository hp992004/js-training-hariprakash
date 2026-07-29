import { createContext, useContext, useState, useEffect } from 'react'
import type {ReactNode} from 'react'

interface Intern {
  id: number; name: string; score: number; role: string; isPresent: boolean
}

interface InternContextType {
  interns:      Intern[]
  isLoading:    boolean
  addIntern:    (intern: Intern) => void
  removeIntern: (id: number) => void
}

const InternContext = createContext<InternContextType | null>(null)

export function InternProvider({ children }: { children: ReactNode }) {
  const [interns,   setInterns]   = useState<Intern[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const defaultInterns: Intern[] = [
    { id: 1, name: 'Rahul', score: 92, role: 'Frontend',  isPresent: true  },
    { id: 2, name: 'Priya', score: 78, role: 'Backend',   isPresent: true  },
    { id: 3, name: 'Amit',  score: 45, role: 'Frontend',  isPresent: false },
    { id: 4, name: 'Sneha', score: 95, role: 'Fullstack', isPresent: true  },
  ]

  useEffect(() => {
    const timer = setTimeout(() => {
      setInterns(prev => {
        const existingNames = new Set(prev.map(i => i.name))
        const missing = defaultInterns.filter(d => !existingNames.has(d.name))
        return missing.length > 0 ? [...prev, ...missing] : prev
      })
      setIsLoading(false)
    }, 800)
    return () => clearTimeout(timer)
  }, [])

  function addIntern(intern: Intern): void {
    setInterns(prev => [...prev, intern])
  }

  function removeIntern(id: number): void {
    setInterns(prev => prev.filter(i => i.id !== id))
  }

  return (
    <InternContext.Provider value={{ interns, isLoading, addIntern, removeIntern }}>
      {children}
    </InternContext.Provider>
  )
}

export function useInterns(): InternContextType {
  const context = useContext(InternContext)
  if (!context) throw new Error('useInterns must be used inside InternProvider')
  return context
}

/*
Theme and intern data have different responsibilities, so they are kept separate.
This keeps the code easier to manage and avoids unrelated updates.
Components can use only the context they actually need.
*/