import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const sanityClient = createClient({
  projectId: '7bh8nilv',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
});

const builder = imageUrlBuilder(sanityClient);

export const urlFor = (source: any) => {
  if (!source) return '';
  return builder.image(source).url();
};

