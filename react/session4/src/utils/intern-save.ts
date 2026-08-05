interface InternFormState {
  name: string
  score: number
  isPresent: boolean
  role: string
}

export function prepareInternPayload(data: InternFormState): string {
  if (!data.name.trim()) {
    throw new Error('Name is required')
  }

  if (data.score < 0 || data.score > 100) {
    throw new Error('Invalid score')
  }

  return JSON.stringify(data)
}

export async function saveIntern(
  payload: string,
  fetchFn: typeof fetch
): Promise<void> {
  await fetchFn('/api/interns', {
    method: 'POST',
    body: payload,
  })
}