'use client';

import { Button } from '@/components/ui/button';
import { Copy, Check } from 'lucide-react';
import { useState } from 'react';

interface CopyButtonProps {
  command: string;
}

export default function CopyButton({ command }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Button
      variant='outline'
      size='icon'
      className='relative rounded-md'
      onClick={copyToClipboard}
      aria-label={copied ? 'Copied' : 'Copy to clipboard'}
    >
      <span className='sr-only'>{copied ? 'Copied' : 'Copy'}</span>
      <Copy
        className={`h-4 w-4 transition-all duration-300 ${
          copied ? 'scale-0' : 'scale-100'
        }`}
      />
      <Check
        className={`absolute inset-0 m-auto h-4 w-4 transition-all duration-300 ${
          copied ? 'scale-100' : 'scale-0'
        }`}
      />
    </Button>
  );
}
