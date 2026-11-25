// Formats in JST so that the prerendered HTML does not depend on the timezone.
export function formatUnixTimestamp(timestamp: number): string {
  const date = new Date((timestamp + 9 * 60 * 60) * 1000);
  const year = date.getUTCFullYear();
  const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
  const day = date.getUTCDate().toString().padStart(2, "0");
  const hours = date.getUTCHours().toString().padStart(2, "0");
  const minutes = date.getUTCMinutes().toString().padStart(2, "0");
  const seconds = date.getUTCSeconds().toString().padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

// Formats the time elapsed since the game started, e.g. "13 m 54 s".
export function formatElapsedTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, "0")} m ${s.toString().padStart(2, "0")} s`;
}
