const DB_NAME = "lingo-local";
const DB_VERSION = 2;

export const STORES = {
  profile: "profile",
  progress: "progress",
  syncQueue: "syncQueue",
} as const;

export type StoreName = (typeof STORES)[keyof typeof STORES];

function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;

      if (!db.objectStoreNames.contains(STORES.profile)) {
        db.createObjectStore(STORES.profile, {
          keyPath: "id",
        });
      }

      if (!db.objectStoreNames.contains(STORES.progress)) {
        const progressStore = db.createObjectStore(STORES.progress, {
          keyPath: "id",
        });

        progressStore.createIndex("userId", "userId", {
          unique: false,
        });
      }

      if (!db.objectStoreNames.contains(STORES.syncQueue)) {
        const syncQueueStore = db.createObjectStore(STORES.syncQueue, {
          keyPath: "id",
          autoIncrement: true,
        });

        syncQueueStore.createIndex("userId", "userId", {
          unique: false,
        });

        syncQueueStore.createIndex("createdAt", "createdAt", {
          unique: false,
        });
      }
    };

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
}

export async function getDatabase(): Promise<IDBDatabase> {
  return openDatabase();
}

export async function put<T>(
  storeName: StoreName,
  value: T,
): Promise<void> {
  const db = await getDatabase();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, "readwrite");
    const store = transaction.objectStore(storeName);

    store.put(value);

    transaction.oncomplete = () => {
      db.close();
      resolve();
    };

    transaction.onerror = () => {
      db.close();
      reject(transaction.error);
    };
  });
}

export async function get<T>(
  storeName: StoreName,
  key: IDBValidKey,
): Promise<T | undefined> {
  const db = await getDatabase();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, "readonly");
    const store = transaction.objectStore(storeName);
    const request = store.get(key);

    request.onsuccess = () => {
      db.close();
      resolve(request.result as T | undefined);
    };

    request.onerror = () => {
      db.close();
      reject(request.error);
    };
  });
}

export async function remove(
  storeName: StoreName,
  key: IDBValidKey,
): Promise<void> {
  const db = await getDatabase();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, "readwrite");
    const store = transaction.objectStore(storeName);

    store.delete(key);

    transaction.oncomplete = () => {
      db.close();
      resolve();
    };

    transaction.onerror = () => {
      db.close();
      reject(transaction.error);
    };
  });
}

export async function getAll<T>(
  storeName: StoreName,
): Promise<T[]> {
  const db = await getDatabase();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, "readonly");
    const store = transaction.objectStore(storeName);
    const request = store.getAll();

    request.onsuccess = () => {
      db.close();
      resolve(request.result as T[]);
    };

    request.onerror = () => {
      db.close();
      reject(request.error);
    };
  });
}