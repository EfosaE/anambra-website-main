import { setupWorker } from "msw/browser";
import { handlers } from "../../mocks/handlers";

// Create a worker using the handlers
const worker = setupWorker(...handlers);

// Start the worker when in development mode
if (process.env.NODE_ENV === "development") {
  worker.start();
}

export { worker }; 
