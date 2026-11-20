// A URL é embutida pelo Expo no bundle. Use o IP do computador que executa a API.
export const API_URL = (process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3333').replace(/\/$/, '');
export async function apiRequest(path, method = 'GET', data) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);
  try {
    const res = await fetch(`${API_URL}${path}`, {
      method,
      headers: { 'Content-Type': 'application/json' },
      ...(data === undefined ? {} : { body: JSON.stringify(data) }),
      signal: controller.signal,
    });
    if (res.status === 204) return null;
    const raw = await res.text();
    let json;
    try { json = raw ? JSON.parse(raw) : null; } catch { json = null; }
    if (!res.ok) throw new Error(json?.error || `Falha HTTP ${res.status}`);
    return json;
  } catch (error) {
    if (error.name === 'AbortError') throw new Error(`Tempo esgotado ao acessar ${API_URL}`);
    if (String(error.message).includes('Network request failed')) throw new Error(`Não foi possível alcançar ${API_URL}. Confira IP e firewall.`);
    throw error;
  } finally { clearTimeout(timeout); }
}
