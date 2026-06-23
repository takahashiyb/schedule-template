import type { StreamWrapper } from '@/types/youtube-streaming-list'

export interface Talent {
  id: string
  name: string
  channelId: string
  gen: number
  genName: string
  color1: string
  color2: string
  color3: string
  type: string
  data?: StreamWrapper[]
  restMessage: string
  debut: string
  birthmonth: number
  birthdate: number
}
