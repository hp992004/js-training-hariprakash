/*
Testability audit — InternContext.tsx

Q1 Predictable output?       YES — given the same actions, the context state updates consistently
Q2 No external dependencies? NO — uses useEffect and setTimeout for delayed initialization
Q3 Dependencies injectable?  NO — default intern data and timer are hardcoded inside the provider

Verdict: MODERATELY TESTABLE
*/


/*
Worst testability: InternContext.tsx

It is the hardest to test because it uses a hardcoded setTimeout
inside useEffect and contains hardcoded default data. These internal
dependencies make tests slower and require fake timers or extra setup.
*/

import { createContext, useContext } from 'react'
import type { ReactNode } from 'react'

import { useInternRepository } from '../repositories/intern-repository'
import {
  createIntern,
  calculateAverageScore,
} from '../services';

import type {
  Intern,
  InternFormState,
} from '../types/intern'

interface InternContextType {
  interns: Intern[]
  averageScore: number
  addIntern: (form: InternFormState) => void
  removeIntern: (id: number) => void
}

const InternContext = createContext<InternContextType | null>(null)

interface InternProviderProps {
  children: ReactNode
}

export function InternProvider({
  children,
}: InternProviderProps) {
  const repo = useInternRepository()

  function addIntern(form: InternFormState): void {
    const intern = createIntern(form)
    repo.add(intern)
  }

  function removeIntern(id: number): void {
    repo.remove(id)
  }

  const value: InternContextType = {
    interns: repo.interns,
    averageScore: calculateAverageScore(repo.interns),
    addIntern,
    removeIntern,
  }

  return (
    <InternContext.Provider value={value}>
      {children}
    </InternContext.Provider>
  )
}

export function useInterns(): InternContextType {
  const context = useContext(InternContext)

  if (!context) {
    throw new Error( 'useInterns: expected to be called inside <InternProvider>, but no provider was found.' )
  }

  return context
}

/*
Theme and intern data have different responsibilities, so they are kept separate.
This keeps the code easier to manage and avoids unrelated updates.
Components can use only the context they actually need.
*/