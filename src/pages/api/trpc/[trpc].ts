import { createNextApiHandler } from "@trpc/server/adapters/next";

import { env } from "../../../env/server.mjs";
import { createTRPCContext } from "../../../server/api/trpc";
import { appRouter } from "../../../server/api/root";

// export API handler
export default createNextApiHandler({
  router: appRouter,
  createContext: createTRPCContext,
  onError:
    env.NODE_ENV === "development"
      ? ({ path, error }) => {
          console.error(
            `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`
          );
        }
      : undefined,
});

export const config = {
  /*
    Some images are large, that's why these limits had to be increased
    We shouldn't use the api for uploading images anyways (use an object storage/CDN instead):
    https://nextjs.org/docs/messages/api-routes-response-size-limit
  */
  api: {
    bodyParser: {
      sizeLimit: "6mb",
    },
    responseLimit: "6mb",
  },
};
