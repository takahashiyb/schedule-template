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

export function isWithinSevenDays(date: string) {
  const targetDate = new Date(date)
  const now = new Date()
  const diffMs = Math.abs(targetDate.getTime() - now.getTime()) // difference in milliseconds
  const diffDays = diffMs / (1000 * 60 * 60 * 24) // convert to days
  return diffDays <= 7
}

export function isToday(date: string) {
  const targetDate = new Date(date)
  const now = new Date()

  return (
    targetDate.getFullYear() === now.getFullYear() &&
    targetDate.getMonth() === now.getMonth() &&
    targetDate.getDate() === now.getDate()
  )
}
