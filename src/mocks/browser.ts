import { setupWorker } from "msw/browser";
import { handlers } from "./handlers";

// Set up the worker with your mock handlers
const worker = setupWorker(...handlers);

// Start the worker in development mode
if (process.env.NODE_ENV === "development") {
  worker.start();
}
