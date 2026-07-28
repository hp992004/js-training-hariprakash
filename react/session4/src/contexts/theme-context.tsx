import { createContext, useContext, useState } from 'react'
import type {ReactNode} from 'react'

type Theme = 'light' | 'dark'

interface ThemeContextType {
  theme:       Theme
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | null>(null)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light')

  function toggleTheme(): void {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useTheme must be used inside ThemeProvider')
  return context
}

/*
The context starts as `null` because it only gets a value from `ThemeProvider`.
Throwing an error ensures `useTheme` is used inside the provider.
This prevents using an invalid default value by mistake.
*/