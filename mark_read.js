import { markAsRead } from './src/db.js';

// Usage: node mark_read.js <channelId> <videoTitle> <videoUrl>

const args = process.argv.slice(2);
if (args.length < 3) {
  console.error("Usage: node mark_read.js <channelId> <videoTitle> <videoUrl>");
  process.exit(1);
}

const [channelId, videoTitle, videoUrl] = args;

// We construct a mock item object to fit the DB schema
const mockItem = {
  id: "manual-" + Date.now(),
  title: videoTitle,
  link: videoUrl,
  pubDate: new Date().toISOString()
};

await markAsRead(channelId, mockItem);

console.log(`Marked ${channelId} as read: ${videoTitle}`);
