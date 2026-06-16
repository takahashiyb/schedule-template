import type { StreamWrapper } from '@/types/youtube-streaming-list'

export async function youtubeUpcomingStreamList(channelId: string): Promise<StreamWrapper[]> {
  const data = []

  const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY

  const params = new URLSearchParams({
    part: 'snippet',
    channelId: channelId,
    maxResults: '20',
    type: 'video',
    eventType: 'upcoming',
    order: 'date',
    key: apiKey,
  })

  const response = await fetch(`https://www.googleapis.com/youtube/v3/search?${params.toString()}`)

  const searchData = await response.json()

  for (let i = 0; i < searchData.items.length; i++) {
    const params = new URLSearchParams({
      part: 'snippet,liveStreamingDetails',
      id: searchData.items[i].id.videoId,
      key: apiKey,
    })
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?${params.toString()}`,
    )

    data.push(await response.json())
  }

  return data
}
