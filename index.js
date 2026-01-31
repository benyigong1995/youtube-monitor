// Monitor script (Draft)
// 1. Read config.json
// 2. Fetch RSS feed for each channel
// 3. Compare with last_checked state
// 4. If new, get transcript
// 5. Call LLM for summary
// 6. Notify User

console.log("YouTube Monitor initialized...");
