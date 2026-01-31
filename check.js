import { fetchLatestVideos } from './src/rss.js';
import { loadState, updateChannelState, getLastSeenVideo } from './src/state.js';
import fs from 'fs/promises';

// Load Config
const config = JSON.parse(await fs.readFile(new URL('./config.json', import.meta.url)));

async function check() {
  const newVideos = [];

  for (const channel of config.channels) {
    // console.log(`Checking ${channel.id}...`);
    const videos = await fetchLatestVideos(channel.rss);
    
    if (videos.length === 0) continue;

    // RSS items are usually newest first
    const latestVideo = videos[0];
    const lastSeenUrl = await getLastSeenVideo(channel.id);

    if (latestVideo.link !== lastSeenUrl) {
      // It's new!
      newVideos.push({
        channelId: channel.id,
        channelName: channel.id,
        promptStyle: channel.prompt_style || 'default',
        video: latestVideo
      });
      
      // We update state *after* processing (or let the caller handle it)
      // For this script, we just Identify. The Agent will Confirm (update state) after processing.
      // Actually, to avoid spamming if the agent fails, maybe we shouldn't update state here?
      // Let's output the new videos, and provide a separate flag/script to "mark as read".
    }
  }

  // Output JSON for the Agent to parse
  console.log(JSON.stringify(newVideos, null, 2));
}

check();
