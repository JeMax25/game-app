/**
 * Cache compartida para todo el servidor
 */
export const cache = new Map<
  string,
  {
    data: unknown;
    expires: number;
  }
>();

export async function getCachedData<T>(
  key: string,
  ttl: number,
  fetcher: () => Promise<T>
): Promise<T> {
  const cached = cache.get(key);

  if (cached && Date.now() < cached.expires) {
    return cached.data as T;
  }

  const data = await fetcher();

  cache.set(key, {
    data,
    expires: Date.now() + ttl,
  });

  return data;
}