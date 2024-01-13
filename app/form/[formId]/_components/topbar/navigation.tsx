import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

type NavigationProps = {
  formId: string;
};

const Navigation = ({ formId }: NavigationProps) => {
  const pathname = usePathname();

  const routes = [
    {
      label: 'Editor',
      path: `/form/${formId}/editor`,
    },
    {
      label: 'Responses',
      path: `/form/${formId}/responses`,
    },
    {
      label: 'Settings',
      path: `/form/${formId}/settings`,
    },
  ];

  return (
    <div className="space-x-2 text-sm text-muted-foreground">
      {routes.map((route) => {
        return (
          <Button
            key={route.label}
            asChild
            variant={'ghost'}
            className={cn(
              'px-3',
              pathname === route.path &&
                'bg-primary/10 text-primary font-semibold'
            )}
          >
            <Link href={route.path}>{route.label}</Link>
          </Button>
        );
      })}
    </div>
  );
};

export default Navigation;
