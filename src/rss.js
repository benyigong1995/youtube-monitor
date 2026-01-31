import Parser from 'rss-parser';

const parser = new Parser();

/**
 * Fetch latest videos from a channel's RSS feed
 * @param {string} rssUrl 
 * @returns {Promise<Array>} List of videos { title, link, pubDate, id }
 */
export async function fetchLatestVideos(rssUrl) {
  try {
    const feed = await parser.parseURL(rssUrl);
    return feed.items.map(item => ({
      title: item.title,
      link: item.link,
      pubDate: item.pubDate,
      id: item.yt_videoId || item.id, // RSS feed usually has yt_videoId
      author: item.author
    }));
  } catch (error) {
    console.error(`Error fetching RSS ${rssUrl}:`, error.message);
    return [];
  }
}
