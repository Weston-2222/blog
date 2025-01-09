import type { MDXComponents } from 'mdx/types';
import React, { ReactElement } from 'react';
import CodeBlocks from './components/codeBlock';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className='text-2xl font-bold p-2'>{children}</h1>
    ),
    h2: ({ children }) => <h2 className='text-xl font-bold p-2'>{children}</h2>,
    h3: ({ children }) => <h3 className='text-lg font-bold p-2'>{children}</h3>,
    h4: ({ children }) => (
      <h4 className='text-base font-bold p-2'>{children}</h4>
    ),

    blockquote: ({ children }) => (
      <blockquote className='p-4 my-4 border-s-4 border-gray-300 bg-foreground dark:border-gray-500 dark:bg-gray-800'>
        {React.Children.map(children, (child) =>
          React.isValidElement<
            ReactElement<React.HTMLAttributes<HTMLElement>, string>
          >(child) ? (
            React.cloneElement(
              child as ReactElement<React.HTMLAttributes<HTMLElement>, string>,
              {
                className: 'italic font-medium leading-relaxed ',
              }
            )
          ) : (
            <span className='italic font-medium leading-relaxed'>{child}</span>
          )
        )}
      </blockquote>
    ),
    pre: ({ children, ...props }) => {
      const child = React.Children.only(children);
      if (React.isValidElement(child)) {
        // 克隆子元素并注入自定义参数
        return React.cloneElement(child, {
          ...props,
        });
      }
      return <div>{child}</div>;
    },
    code: ({ className, children, ...props }) => {
      return (
        <CodeBlocks {...props} className={className}>
          {children}
        </CodeBlocks>
      );
    },

    ...components,
  };
}
