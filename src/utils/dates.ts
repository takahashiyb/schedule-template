// Just the date (example: 03 - When date is 2001-02-03T04:05:06Z)

export function getDate(time: string, timezone: string) {
  const date = new Date(time)
  return date.toLocaleDateString('en-US', {
    timeZone: timezone, // PDT/PST auto handled
    day: '2-digit',
  })
}

// Just the date (example: Feb - When date is 2001-02-03T04:05:06Z)

export function getMonthShort(time: string, timezone: string) {
  const date = new Date(time)
  return date.toLocaleDateString('en-US', {
    timeZone: timezone, // PDT/PST auto handled
    month: 'short',
  })
}

export function getMonthShortDate(time: string, timezone: string) {
  const date = new Date(time)
  return date.toLocaleDateString('en-US', {
    timeZone: timezone, // PDT/PST auto handled
    month: 'short',
    day: '2-digit',
  })
}

export function getTime(time: string, timezone: string) {
  const date = new Date(time)
  return date.toLocaleTimeString('en-US', {
    timeZone: timezone, // PDT/PST auto handled
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function getDayWeek(time: string, timezone: string) {
  const date = new Date(time)
  return date.toLocaleDateString('en-US', {
    timeZone: timezone, // PDT/PST auto handled
    weekday: 'short',
  })
}
