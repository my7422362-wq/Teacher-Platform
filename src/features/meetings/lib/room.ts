/** Generates a unique Jitsi Meet room name. Jitsi's free public server
 *  (meet.jit.si) needs no account or API key — any room name works, but
 *  it must be hard to guess since anyone who knows it can join, so we
 *  namespace it and append a random suffix. */
export function generateRoomName(courseSlug: string): string {
  const random = Math.random().toString(36).slice(2, 10);
  return `taalom-${courseSlug}-${random}`;
}

export function getJitsiEmbedUrl(roomName: string): string {
  return `https://meet.jit.si/${encodeURIComponent(roomName)}#config.prejoinPageEnabled=true`;
}
