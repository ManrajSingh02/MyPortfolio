import { createClient } from "@sanity/client";

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID?.trim();
const dataset = import.meta.env.VITE_SANITY_DATASET?.trim();

export const canUseSanity = Boolean(projectId && dataset);

export const client = canUseSanity
  ? createClient({
      projectId,
      dataset,
     apiVersion:
  import.meta.env.VITE_SANITY_API_VERSION?.trim() || "2025-07-01",
      useCdn: true,
    })
  : null;
