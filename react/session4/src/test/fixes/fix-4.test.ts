import { test, expect, vi } from 'vitest'

test('loads interns from API', async () => {
  vi.stubGlobal(
    'fetch',
    vi.fn().mockResolvedValue({
      json: async () => [
        { id: 1, name: 'Hari' },
        { id: 2, name: 'Rahul' },
        { id: 3, name: 'Priya' },
        { id: 4, name: 'Anu' },
      ],
    })
  )

  const response = await fetch('http://localhost:5173/api/interns')
  const data = await response.json()

  expect(data).toHaveLength(4)

  vi.unstubAllGlobals()
})