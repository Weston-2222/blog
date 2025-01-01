import createMDX from '@next/mdx';

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  reactStrictMode: false,
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [],
    rehypePlugins: [
      ['rehype-code-titles'],
      ['rehype-prism-plus', { strict: true, throwOnError: true }],
      ['rehype-slug'],
    ],
  },
});

export default withMDX(nextConfig);
