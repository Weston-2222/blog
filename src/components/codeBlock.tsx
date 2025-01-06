import customTheme from '@/styles/codaBlock';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import Collapsible from './framer/collapsible';

type CodeBlocksProps = {
  className: string;
  children: React.ReactNode;
  foldHeight?: string | boolean;
};

const CodeBlocks = ({ className, children, foldHeight }: CodeBlocksProps) => {
  const language = className?.replace('language-', '') || 'plaintext';

  if (foldHeight === true) foldHeight = '100px';

  const content = (
    <div className='w-full overflow-x-auto rounded-lg flex justify-center items-center'>
      <SyntaxHighlighter
        language={language}
        style={customTheme as { [key: string]: object }}
        customStyle={{
          width: '90vw',
          margin: 0,
          fontFamily: 'Menlo, Monaco, "Courier New", monospace',
        }}
      >
        {String(children)}
      </SyntaxHighlighter>
    </div>
  );

  return foldHeight ? (
    <Collapsible foldHeight={foldHeight}>{content}</Collapsible>
  ) : (
    content
  );
};

export default CodeBlocks;
