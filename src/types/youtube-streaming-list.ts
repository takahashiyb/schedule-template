interface StreamItem {
  id: string
  liveStreamingDetails: {
    scheduledStartTime: string
  }

  snippet: {
    title: string
    liveBroadcastContent: string
  }
}

export interface StreamWrapper {
  items: StreamItem[]
}
