import { getDatabase } from "./db";

export async function initializeLocalStorage() {
  try {
    await getDatabase();
    console.log("Lingo local storage initialized.");
  } catch (error) {
    console.error("Lingo local storage initialization failed:", error);
  }
}
