declare module '*.mdx' {
  export const metadata: {
    title: string;
    description: string;
    path: string;
    slug: string;
    date: string;
    image: string;
    url: string;
  };
}
