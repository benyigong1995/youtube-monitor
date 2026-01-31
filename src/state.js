import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// Go up two levels from src/ (src -> youtube-monitor -> clawd) then into memory
const DB_PATH = path.resolve(__dirname, '../../memory/youtube_monitor.json');

export async function loadState() {
  try {
    const data = await fs.readFile(DB_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    // Return default structure if file doesn't exist
    return { channels: {} };
  }
}

export async function saveState(state) {
  try {
    // Ensure directory exists
    await fs.mkdir(path.dirname(DB_PATH), { recursive: true });
    await fs.writeFile(DB_PATH, JSON.stringify(state, null, 2));
  } catch (error) {
    console.error("Failed to save state:", error);
  }
}

export async function updateChannelState(channelId, videoInfo) {
  const state = await loadState();
  if (!state.channels[channelId]) {
    state.channels[channelId] = {};
  }
  
  state.channels[channelId] = {
    ...state.channels[channelId],
    last_video_url: videoInfo.link,
    last_video_title: videoInfo.title,
    last_checked: Date.now()
  };

  await saveState(state);
}

export async function getLastSeenVideo(channelId) {
  const state = await loadState();
  return state.channels[channelId]?.last_video_url || null;
}
