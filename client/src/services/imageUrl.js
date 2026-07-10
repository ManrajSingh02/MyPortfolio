import imageUrlBuilder from "@sanity/image-url";
import { client } from "./sanityClient";

const builder = client ? imageUrlBuilder(client) : null;

export function urlFor(source) {
  if (!source || typeof source === "string" || !builder) {
    return source || "";
  }

  return builder.image(source);
}
