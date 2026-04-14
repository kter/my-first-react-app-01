export default async function fetcher(url) {
  await sleep(2000);
  const res = await fetch(url);
  if (res.ok) { return await res.json(); }
  throw new Error(res.statusText);
}

function sleep(delay) {
  return new Promise(resolve => setTimeout(resolve, delay));
}
