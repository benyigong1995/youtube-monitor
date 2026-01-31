import { YoutubeTranscript } from 'youtube-transcript';

// Usage: node get_transcript.js <videoId_or_url>

const args = process.argv.slice(2);
if (args.length < 1) {
  console.error("Usage: node get_transcript.js <url>");
  process.exit(1);
}

const url = args[0];

try {
  const transcript = await YoutubeTranscript.fetchTranscript(url);
  // Join text
  const fullText = transcript.map(t => t.text).join(' ');
  console.log(fullText);
} catch (e) {
  console.error("Error fetching transcript:", e.message);
  process.exit(1);
}
