const value = process.env.NEXT_PUBLIC_SITE_URL?.trim();
if (!value) throw new Error('Set NEXT_PUBLIC_SITE_URL to your actual HTTPS domain before preparing a public deployment.');
const url = new URL(value);
if (url.protocol !== 'https:' || ['localhost', '127.0.0.1', '0.0.0.0'].includes(url.hostname) || url.pathname !== '/' || url.search || url.hash) {
  throw new Error('NEXT_PUBLIC_SITE_URL must be a public HTTPS origin, without a path, query, or fragment.');
}
console.log(`Public deployment URL validated: ${url.origin}`);
