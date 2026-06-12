<script setup lang="ts">
import { ref } from 'vue'

const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY

const name = ref('')

const website = ref('')

const channel = ref()

const video = ref()

// snippet : Human‑readable metadata: title, description, published date, channel info, thumbnails, tags, category ID.
// statistics :  Numeric metrics: view count, like count, favorite count, comment count.
// contentDetails : Technical info: duration, definition (HD/SD), caption availability, region restrictions.
// status : Upload status, privacy status (public/private/unlisted), license, embeddable flag.
// player : Embed HTML code for the video player.
// topicDetails : Associated Freebase topics (deprecated in some cases).
//  recordingDetails: Location and date of recording (if provided).

async function getYoutube(name: string) {
  const searchParams = new URLSearchParams({
    part: 'snippet',
    q: name,
    type: 'channel',
    key: apiKey,
  })

  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/search?${searchParams.toString()}`,
  )

  const data = await response.json()

  channel.value = data

  website.value = 'YouTube:'
}

async function getYoutubeVideo(name: string) {
  const searchParams = new URLSearchParams({
    part: 'snippet,contentDetails,statistics,liveStreamingDetails',
    id: name,
    key: apiKey,
  })

  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?${searchParams.toString()}`,
  )

  const data = await response.json()

  channel.value = data

  website.value = 'YouTube:'
}

async function getChannelVideoList(name: string) {
  const params = new URLSearchParams({
    part: 'snippet',
    channelId: name,
    maxResults: '6',
    type: 'video',
    eventType: 'upcoming',
    order: 'date',
    key: apiKey,
  })

  const response = await fetch(`https://www.googleapis.com/youtube/v3/search?${params.toString()}`)

  const data = await response.json()

  video.value = data
}
</script>
<template>
  <h1>Channel Searcher</h1>

  <h2>Channel-name:</h2>

  <label> <input type="text" v-model="name" /></label>
  <button @click="getYoutube(name)">Search Youtube Channel</button>
  <button @click="getChannelVideoList(name)">Search Channel Video List</button>
  <button @click="getYoutubeVideo(name)">Search Youtube Video</button>

  <section>
    <div class="card" v-for="value in channel ? channel.items : 0" :key="value.snippet.title">
      <p>
        {{ value.snippet.title }}
      </p>
      <p>
        {{ value.snippet.channelId }}
      </p>
      <p>
        {{ value.snippet.liveBroadcastContent }}
      </p>
      <img
        :src="`${value.snippet.thumbnails.default.url}`"
        loading="lazy"
        alt="hello"
        @load="() => console.log('Image loaded!')"
        @error="() => console.error('Image failed!')"
      />
    </div>
  </section>
  <section>
    {{ video }}
  </section>
</template>
<style scoped lang="scss">
.card {
  display: grid;
  grid-template-columns: max-content 1fr;
  grid-template-rows: 1fr 1fr 1fr;
}

.card img {
  grid-column: 1;
  grid-row: 1/-1;
}

.card p {
  grid-column: 2;
}
</style>
