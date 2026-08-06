const APP_NAME = 'Intern Dashboard'

if (!APP_NAME.trim()) {
  throw new Error(
    'config: APP_NAME is required. Set a valid application name in config.ts.'
  )
}

export const config = {
  appName: APP_NAME,
}