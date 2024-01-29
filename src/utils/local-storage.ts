export function setLocalStorage<T>({ key, value }: { key: string; value: T }) {
  const formattedSaveData = JSON.stringify(value);

  return localStorage.setItem(key, formattedSaveData);
}

export function getLocalStorage({ key }: { key: string }) {
  const loadedSaveData = localStorage.getItem(key);

  if (!loadedSaveData) {
    return null;
  }

  const parsedSaveData = JSON.parse(loadedSaveData);
  return parsedSaveData;
}

export function removeLocalStorage({ key }: { key: string }) {
  localStorage.removeItem(key);
}
