# YouTube Monitor 📺

> A Vibe Coding Project for Master G.

Automated intelligence pipeline that monitors specific YouTube channels, extracts transcripts, and generates high-signal summaries (Protocol Cards or News Briefs).

## Features

- **Multi-Style Intelligence**:
  - `huberman_protocol`: Extracts scientific mechanisms and actionable protocols (What & How).
  - `news_commentary`: Extracts core facts, unique opinions, and predictions.
- **State Management**: Tracks watched videos to prevent duplicates.
- **Modular Design**: Separated Fetcher, State, and Logic.

## Usage

### 1. Check for Updates
```bash
node check.js
```
Returns a JSON list of new videos detected since last run.

### 2. Get Transcript
```bash
node get_transcript.js <video_url>
```
Returns the full text transcript of the video.

### 3. Mark as Read
```bash
node mark_read.js <channel_id> <title> <url>
```
Updates the local state database.

## Configuration

Edit `config.json` to add channels:

```json
{
  "channels": [
    {
      "id": "Andrew Huberman",
      "url": "...",
      "rss": "...",
      "prompt_style": "huberman_protocol"
    }
  ]
}
```

## Structure

- `src/rss.js`: RSS Feed parser.
- `src/state.js`: JSON file persistence (stored in `../../memory/youtube_monitor.json`).
- `src/prompts.js`: LLM System Prompts for different content types.
