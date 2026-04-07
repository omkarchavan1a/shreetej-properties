import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://shreetejproperties.com';

  // Add the routes of your application here
  const routes = [
    '',
    '/about',
    '/projects',
    '/residential',
    '/commercial',
    '/contact',
    '/services',
    '/blogs',
    '/press',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  return routes;
}
