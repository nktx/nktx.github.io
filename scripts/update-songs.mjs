// Writes assets/songs.json from the Spotify playlist behind the "Recently
// Liked" card: [{ title, artist, url, cover }].
//
// The browser can't read the playlist itself (no CORS), so this runs in the
// update-picks workflow. The track list comes from the playlist's public
// embed page and each cover from Spotify's oEmbed endpoint; neither needs a
// key. On any failure it exits non-zero and leaves the old file in place.

import { writeFile } from "node:fs/promises";

const PLAYLIST = "4QKnNk3eyTuQOae1Hsmh82";
const OUT = new URL("../assets/songs.json", import.meta.url);

async function get(url, as) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return res[as]();
}

const html = await get(`https://open.spotify.com/embed/playlist/${PLAYLIST}`, "text");
const json = html.match(/<script id="__NEXT_DATA__"[^>]*>([\s\S]*?)<\/script>/)?.[1];
if (!json) throw new Error("No __NEXT_DATA__ on the embed page");
const tracks = JSON.parse(json).props?.pageProps?.state?.data?.entity?.trackList;
if (!Array.isArray(tracks) || !tracks.length) throw new Error("Empty track list");

const songs = [];
for (const t of tracks) {
  const id = t.uri?.match(/^spotify:track:(\w+)$/)?.[1];
  if (!id) continue;
  const url = `https://open.spotify.com/track/${id}`;
  const { thumbnail_url } = await get(`https://open.spotify.com/oembed?url=${encodeURIComponent(url)}`, "json");
  // oEmbed gives the 300px album art; the same image id with the 0000b273
  // size code is the 640px one, sharp on retina cards.
  const art = thumbnail_url?.match(/ab67616d00001e02([0-9a-f]+)$/)?.[1];
  const cover = art ? `https://i.scdn.co/image/ab67616d0000b273${art}` : thumbnail_url;
  songs.push({ title: t.title, artist: t.subtitle, url, cover });
}
if (!songs.length) throw new Error("No playable tracks");

await writeFile(OUT, JSON.stringify(songs, null, 2) + "\n");
console.log(`Wrote ${songs.length} songs`);
