/* eslint-disable @typescript-eslint/no-var-requires */
const { SitemapStream } = require('sitemap');
const { createWriteStream } = require('fs');

const urls = [
  { url: '/', changefreq: 'daily', priority: 1 },
  { url: '/sign-up', changefreq: 'monthly', priority: 0.1 },
  { url: '/login', changefreq: 'monthly', priority: 0.1 },
  { url: '/goods/goods-list', changefreq: 'weekly', priority: 0.7 },
  { url: '/goods/goods-detail/:id', changefreq: 'weekly', priority: 0.7 },
  { url: '/auth', changefreq: 'daily', priority: 1 },
  { url: '/my-page/:id', changefreq: 'daily', priority: 1 },
  { url: '/order', changefreq: 'daily', priority: 0.5 },
  { url: '/order/complete', changefreq: 'monthly', priority: 0.1 },
  { url: '/order-list', changefreq: 'daily', priority: 0.5 },
  { url: '/console/:id', changefreq: 'daily', priority: 1 },
  { url: '/console/add-product/:id', changefreq: 'weekly', priority: 1 },
  { url: '/console/order-management/:id', changefreq: 'daily', priority: 1 },
];

const sitemapStream = new SitemapStream({ hostname: 'http://localhost:5173' });

sitemapStream
  .pipe(createWriteStream('./public/sitemap.xml'))
  .on('error', (error) => console.error(error))
  .on('finish', () => console.log('Sitemap has been written.'));

urls.forEach((url) => sitemapStream.write(url));

sitemapStream.end();
