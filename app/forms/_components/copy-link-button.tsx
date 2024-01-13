import { Button } from '@/components/ui/button';
import { Check, Copy, Share2 } from 'lucide-react';
import React, { useState } from 'react';

type CopyLinkButtonProps = {
  value: string;
};

const CopyLinkButton = ({ value }: CopyLinkButtonProps) => {
  const [copied, setCopied] = useState(false);
  return (
    <Button
      onClick={(e) => {
        e.stopPropagation();
        setCopied(true);
        navigator.clipboard.writeText(value);
        setTimeout(() => setCopied(false), 3000);
      }}
      variant={'secondary'}
      size={'icon'}
      className="group rounded-full text-gray-500 hover:bg-primary/10 hover:text-primary"
    >
      {copied ? (
        <Check className="w-4 h-4" />
      ) : (
        <>
          <Share2 className="w-4 h-4 group-hover:hidden" />
          <Copy className="w-4 h-4 hidden group-hover:block" />
        </>
      )}
    </Button>
  );
};

export default CopyLinkButton;
