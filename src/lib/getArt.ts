import { client } from "./client";

export async function getArt() {
  const arts = await client.fetch(`
    *[_type == "Artwork"] | order(order asc) {
      _id,
      title,
      slug,
      featuredImage,
      year,
      category,
      description
    }
  `);

  return arts;
}
