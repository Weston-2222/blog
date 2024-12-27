'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Copy, Check } from 'lucide-react';
import { useState } from 'react';

interface CopyButtonProps {
  command: string;
  className?: string;
}

export default function CopyButton({ command, className }: CopyButtonProps) {
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
      className={cn('relative rounded-md', className)}
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
