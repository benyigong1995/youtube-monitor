# Universal Content Monitor 📡

> A Vibe Coding Project for Master G.

**Current Status:** Phase 1 (YouTube) ✅

An automated intelligence pipeline designed to monitor various content sources, extract core information, and generate high-signal summaries (Protocol Cards, News Briefs, etc.).

## Vision 🔮

This project is evolving into a universal information aggregator. Future integrations planned:
- [x] **YouTube** (Huberman, Stone 记)
- [ ] **Bilibili** (Tech/Gaming updaters)
- [ ] **Blogs/RSS** (Hacker News, Personal Blogs)
- [ ] **Social Media** (Twitter/X, Weibo - High-value accounts)

## Features

- **Multi-Style Intelligence**:
  - `huberman_protocol`: Extracts scientific mechanisms and actionable protocols (What & How).
  - `news_commentary`: Extracts core facts, unique opinions, and predictions.
- **State Management**: Tracks watched items (videos/posts) to prevent duplicates.
- **Modular Design**: Separated Fetcher, State, and Logic.

## Usage

### 1. Check for Updates
```bash
node check.js
```
Returns a JSON list of new items detected since last run.

### 2. Get Transcript / Content
```bash
node get_transcript.js <url>
```
Returns the text content for processing.

### 3. Mark as Read
```bash
node mark_read.js <channel_id> <title> <url>
```
Updates the local state database.

## Configuration

Edit `config.json` to add sources:

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

- `src/rss.js`: RSS Feed parser (YouTube/Blogs).
- `src/state.js`: JSON file persistence (stored in `../../memory/youtube_monitor.json`).
- `src/prompts.js`: LLM System Prompts for different content types.
