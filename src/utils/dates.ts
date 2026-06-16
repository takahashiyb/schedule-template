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

export function getShortTime(time: string, timezone: string) {
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

export function isToday(date: string, timezone: string) {
  const target = new Date(date)

  // Format both target and "now" in the same timezone
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })

  const targetKey = formatter.format(target)
  const nowKey = formatter.format(new Date())

  return targetKey === nowKey
}

export function getNowInTimezone(timezone: string): Date {
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  })

  const parts = formatter.formatToParts(new Date())
  const year = Number(parts.find((p) => p.type === 'year')!.value)
  const month = Number(parts.find((p) => p.type === 'month')!.value)
  const day = Number(parts.find((p) => p.type === 'day')!.value)
  const hour = Number(parts.find((p) => p.type === 'hour')!.value)
  const minute = Number(parts.find((p) => p.type === 'minute')!.value)
  const second = Number(parts.find((p) => p.type === 'second')!.value)

  // Construct a Date object in local time, but representing the target zone's "now"
  return new Date(year, month - 1, day, hour, minute, second)
}

export function getYMD(time: string | Date = '', timezone: string) {
  const date = new Date(time)
  return date.toLocaleDateString('en-US', {
    timeZone: timezone, // PDT/PST auto handled
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
  })
}
