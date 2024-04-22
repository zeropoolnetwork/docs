// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

import {themes as prismThemes} from 'prism-react-renderer';
import math from 'remark-math';
import katex from 'rehype-katex';


/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'ZeroPool',
  tagline: 'privacy engine for blockchain',
  url: 'https://your-docusaurus-test-site.com',
  baseUrl: '/',
  onBrokenLinks: 'log',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'zeropoolnetwork', // Usually your GitHub org/user name.
  projectName: 'docs', // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          path: 'docs/privacy-engine',
          routeBasePath: 'docs/privacy-engine',
          sidebarPath: require.resolve('./sidebars.js'),
          remarkPlugins: [math],
          rehypePlugins: [katex],
        },
        blog: {
          blogTitle: 'Research',
          path: 'research',
          routeBasePath: 'research',
          remarkPlugins: [math],
          rehypePlugins: [katex],
          blogSidebarCount: 'ALL',
          blogSidebarTitle: 'All our posts',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'storage',
        path: 'docs/sharded-storage',
        routeBasePath: 'docs/sharded-storage',
        sidebarPath: require.resolve('./sidebars.js'),
        remarkPlugins: [math],
        rehypePlugins: [katex],
      },
    ],
  ],

  stylesheets: [
    {
      href: '/css/katex.min.css',
      type: 'text/css',
      integrity:
        'sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM',
      crossorigin: 'anonymous',
    },
  ],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        items: [
          {
            href: '/',
            position: 'left',
            label: 'ZeroPool',
          },
          {
            href: '#contacts',
            position: 'left',
            label: 'Contact us',
          },
          {
            href: '/research',
            position: 'left',
            label: 'Research',
          },
          {
            to: '/docs',
            position: 'left',
            label: 'Docs',
          },
        ],
      }, 
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
    themes:[
        ["@easyops-cn/docusaurus-search-local",{
          hashed: true,
        }]
    ]
};

module.exports = config;
