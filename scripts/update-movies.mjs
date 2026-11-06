// Writes assets/movies.json for the "Recently Viewed" card from an IMDb
// ratings export: the five most recently rated titles as
// [{ title, rating, url, poster }].
//
// IMDb has no API and guards its pages against bots, so the data comes from
// IMDb's own export (Your Ratings → Export), committed as
// data/imdb-ratings.csv. Posters come from TMDB, matched by IMDb id; set
// TMDB_API_KEY to a TMDB v3 API key or v4 read access token.

import { readFile, writeFile } from "node:fs/promises";

const COUNT = 5;
const CSV = new URL("../data/imdb-ratings.csv", import.meta.url);
const OUT = new URL("../assets/movies.json", import.meta.url);
const KEY = process.env.TMDB_API_KEY;
if (!KEY) throw new Error("TMDB_API_KEY is not set");

// RFC 4180: quoted fields may hold commas, newlines and doubled quotes.
function parseCsv(text) {
  const rows = [];
  let row = [], field = "", quoted = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (quoted) {
      if (c === '"' && text[i + 1] === '"') field += '"', i++;
      else if (c === '"') quoted = false;
      else field += c;
    } else if (c === '"') quoted = true;
    else if (c === ",") row.push(field), field = "";
    else if (c === "\n" || c === "\r") {
      if (c === "\r" && text[i + 1] === "\n") i++;
      row.push(field), rows.push(row), row = [], field = "";
    } else field += c;
  }
  if (field || row.length) row.push(field), rows.push(row);
  const [head, ...body] = rows.filter(r => r.some(Boolean));
  const names = head.map(h => h.replace(/^﻿/, "").trim());
  return body.map(r => Object.fromEntries(names.map((n, i) => [n, r[i] ?? ""])));
}

async function poster(imdbId) {
  // v4 tokens are long JWTs sent as a bearer header; v3 keys go in the query.
  const bearer = KEY.length > 40;
  const url = new URL(`https://api.themoviedb.org/3/find/${imdbId}`);
  url.searchParams.set("external_source", "imdb_id");
  if (!bearer) url.searchParams.set("api_key", KEY);
  const res = await fetch(url, bearer ? { headers: { Authorization: `Bearer ${KEY}` } } : {});
  if (!res.ok) throw new Error(`TMDB ${res.status} for ${imdbId}`);
  const data = await res.json();
  const hit = [...data.movie_results, ...data.tv_results, ...data.tv_episode_results].find(r => r.poster_path || r.still_path);
  const path = hit?.poster_path || hit?.still_path;
  return path ? `https://image.tmdb.org/t/p/w500${path}` : null;
}

const recent = parseCsv(await readFile(CSV, "utf8"))
  .filter(r => /^tt\d+$/.test(r.Const) && r["Your Rating"] && r["Date Rated"])
  .sort((a, b) => b["Date Rated"].localeCompare(a["Date Rated"]));

const movies = [];
for (const r of recent) {
  const image = await poster(r.Const);
  if (!image) {
    console.warn(`No poster for ${r.Const} ${r.Title}, skipped`);
    continue;
  }
  movies.push({
    title: r.Title,
    rating: Number(r["Your Rating"]),
    url: `https://www.imdb.com/title/${r.Const}/`,
    poster: image,
  });
  if (movies.length === COUNT) break;
}
if (!movies.length) throw new Error("No rated titles with posters");

await writeFile(OUT, JSON.stringify(movies, null, 2) + "\n");
console.log(`Wrote ${movies.length} titles`);
