import { fetchLatestVideos } from './src/rss.js';
import { getLastSeenVideo, markAsRead, initChannel } from './src/db.js';
import fs from 'fs/promises';
import dotenv from 'dotenv';

dotenv.config();

// Load Config
const config = JSON.parse(await fs.readFile(new URL('./config.json', import.meta.url)));

async function check() {
  const newVideos = [];

  for (const channel of config.channels) {
    // Ensure channel exists in DB
    await initChannel(channel);

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
      
      // In a real automated loop, we might mark as read AFTER successful processing.
      // But for this "Scanner" mode, we verify first.
    }
  }

  // Output JSON for the Agent to parse
  if (newVideos.length > 0) {
    console.log(JSON.stringify(newVideos, null, 2));
  } else {
    // console.log("[]"); // Silent is better
  }
}

check();
