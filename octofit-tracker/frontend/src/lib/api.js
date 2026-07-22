export function getApiBaseUrl() {
  const codespace = import.meta.env.VITE_CODESPACE_NAME;

  if (codespace && codespace.trim()) {
    return `https://${codespace}-8000.app.github.dev/api`;
  }

  if (typeof window !== 'undefined') {
    const { protocol, hostname } = window.location;

    if (hostname.endsWith('.app.github.dev')) {
      const codespaceHost = hostname.replace(/-\d+\.app\.github\.dev$/, '-8000.app.github.dev');
      return `${protocol}//${codespaceHost}/api`;
    }
  }

  // Safe localhost fallback prevents https://undefined-8000... URLs.
  return 'http://localhost:8000/api';
}

export function getItemsFromResponse(payload) {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (Array.isArray(payload?.items)) {
    return payload.items;
  }

  if (Array.isArray(payload?.results)) {
    return payload.results;
  }

  return [];
}

export function getTotalFromResponse(payload, items) {
  if (typeof payload?.count === 'number') {
    return payload.count;
  }

  if (typeof payload?.total === 'number') {
    return payload.total;
  }

  return items.length;
}

export async function fetchCollection(endpoint) {
  const baseUrl = getApiBaseUrl();
  const response = await fetch(`${baseUrl}/${endpoint}/`);

  if (!response.ok) {
    throw new Error(`Request failed (${response.status})`);
  }

  const payload = await response.json();
  const items = getItemsFromResponse(payload);
  const total = getTotalFromResponse(payload, items);

  return { baseUrl, items, total };
}
