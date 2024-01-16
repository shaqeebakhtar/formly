'use client';

import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navigation from '../../_components/topbar/navigation';

const ResponsesTopbar = ({
  formId,
  formName,
}: {
  formId: string;
  formName: string;
}) => {
  const router = useRouter();

  return (
    <div className="sticky left-0 right-0 top-0 z-20 border-b border-gray-200 bg-white">
      <div className="mx-auto w-full max-w-screen-3xl px-2.5 lg:px-20">
        <div className="flex h-16 items-center justify-between">
          <div className="flex space-x-2 text-sm">
            <Link href="/" className="text-muted-foreground">
              Home
            </Link>
            <span className="text-muted-foreground">/</span>
            <p className="font-medium">{formName}</p>
          </div>
          <Navigation formId={formId} />
          <Button
            variant={'outline'}
            onClick={() => router.push(`/s/${formId}`)}
          >
            <ExternalLink className="w-5 h-5 mr-2" />
            View Live
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResponsesTopbar;
