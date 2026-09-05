import { getDatabase } from "./db";

export async function initializeLocalStorage() {
  try {
    await getDatabase();
  } catch (error) {
    console.error("Lingo local storage initialization failed:", error);
  }
}
