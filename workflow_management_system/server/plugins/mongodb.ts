import { connectDB } from "../db/db";

// server/plugins/mongodb.ts
export default defineNitroPlugin(async (nitroApp) => {
  try {
    await connectDB();
    console.log(' Database initialized via Nitro Plugin');
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error(' Critical: Database failed to connect on startup:', message);
  }
}); 