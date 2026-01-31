import { updateChannelState } from './src/state.js';

// Usage: node mark_read.js <channelId> <videoTitle> <videoUrl>

const args = process.argv.slice(2);
if (args.length < 3) {
  console.error("Usage: node mark_read.js <channelId> <videoTitle> <videoUrl>");
  process.exit(1);
}

const [channelId, videoTitle, videoUrl] = args;

await updateChannelState(channelId, {
  title: videoTitle,
  link: videoUrl
});

console.log(`Marked ${channelId} as read: ${videoTitle}`);
