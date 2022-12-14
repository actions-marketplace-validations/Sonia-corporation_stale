// @ts-check
const lightCodeTheme = require(`prism-react-renderer/themes/github`);
const darkCodeTheme = require(`prism-react-renderer/themes/dracula`);
/** @type {import('@docusaurus/types').Config} */
const config = {
  baseUrl: `/`,
  baseUrlIssueBanner: true,
  favicon: `img/favicon.ico`,
  i18n: {
    defaultLocale: `en`,
    locales: [`en`, `fr`],
  },
  noIndex: false,
  onBrokenLinks: `throw`,
  onBrokenMarkdownLinks: `throw`,
  onDuplicateRoutes: `throw`,
  organizationName: `sonia-corporation`,
  plugins: [`@docusaurus/plugin-ideal-image`],
  presets: [
    [
      `classic`,
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        blog: {
          blogDescription: `The blog containing the important updates and information to know about this action.`,
          blogSidebarCount: 5,
          blogSidebarTitle: `Recent posts`,
          blogTitle: `Sonia stale action blog`,
          editUrl: `https://github.com/Sonia-corporation/stale/tree/develop/documentation/`,
          path: `blog`,
          postsPerPage: 10,
          showReadingTime: true,
          sortPosts: `descending`,
        },
        docs: {
          editUrl: `https://github.com/Sonia-corporation/stale/tree/develop/documentation/`,
          sidebarPath: require.resolve(`./sidebars.js`),
        },
        theme: {
          customCss: require.resolve(`./src/css/custom.css`),
        },
      }),
    ],
  ],
  projectName: `stale`,
  tagline: `A GitHub action to stale and close automatically your issues and pull requests.`,
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      algolia: {
        apiKey: `2b0b5f5c53eb7c8e61d84c350ca9af70`,
        appId: `2SFOQ67X82`,
        contextualSearch: true,
        indexName: `github-stale-action`,
      },
      docs: {
        sidebar: {
          autoCollapseCategories: true,
          hideable: true,
        },
      },
      footer: {
        copyright: `Copyright © ${new Date().getFullYear()} Stale, Sonia Corporation. Built with Docusaurus.`,
        links: [
          {
            items: [
              {
                label: `Introduction`,
                to: `/docs/introduction`,
              },
              {
                label: `Getting started`,
                to: `/docs/getting-started/workflow-creation`,
              },
              {
                label: `Examples`,
                to: `/docs/examples/stale-with-comments-except-if-assigned-example`,
              },
            ],
            title: `Docs`,
          },
          {
            items: [
              {
                href: `https://github.com/Sonia-corporation/stale/issues/new/choose`,
                label: `New issue`,
              },
              {
                href: `/docs/troubleshooting`,
                label: `Troubleshooting`,
              },
              {
                href: `/docs/need-help`,
                label: `Need help?`,
              },
            ],
            title: `Useful links`,
          },
          {
            items: [
              {
                href: `/docs/changelog`,
                label: `Changelog`,
              },
              {
                label: `Blog`,
                to: `/blog`,
              },
              {
                href: `https://github.com/Sonia-corporation/stale`,
                label: `GitHub`,
              },
            ],
            title: `More`,
          },
        ],
        style: `dark`,
      },
      navbar: {
        items: [
          {
            docId: `introduction`,
            label: `Documentation`,
            position: `left`,
            type: `doc`,
          },
          { label: `Blog`, position: `left`, to: `/blog` },
          {
            position: `right`,
            type: `localeDropdown`,
          },
          {
            href: `https://github.com/Sonia-corporation/stale`,
            label: `GitHub`,
            position: `right`,
          },
        ],
        logo: {
          alt: `Sonia stale action`,
          src: `img/logo.svg`,
        },
        title: `Sonia stale action`,
      },
      prism: {
        darkTheme: darkCodeTheme,
        theme: lightCodeTheme,
      },
    }),
  title: `Sonia stale action`,
  trailingSlash: false,
  url: `https://sonia-stale-action.vercel.app`,
};

module.exports = config;
