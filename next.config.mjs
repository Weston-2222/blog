import createMDX from '@next/mdx';
import withBundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzerConfig = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  reactStrictMode: false,
  output: 'export',
  images: {
    unoptimized: true, // 禁用圖片優化
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [],
    rehypePlugins: [['rehype-slug'], ['rehype-mdx-code-props']],
  },
});

export default withBundleAnalyzerConfig(withMDX(nextConfig));
