'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardFooter, CardHeader } from '@/components/ui/card';
import { Form, User } from '@prisma/client';
import { formatDistance } from 'date-fns';
import { FileText } from 'lucide-react';
import CopyLinkButton from './copy-link-button';
import FormCardDropdownMenu from './form-card-dropdown-menu';
import { getBaseURL } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';

type FormCardProps = {
  form: Form & { user: Partial<User> };
  responses: number;
};

const FormCard = ({ form, responses }: FormCardProps) => {
  const shareUrl = `${getBaseURL()}/form/${form.id}`;

  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="w-9 h-9">
              <AvatarImage src={form.user.image || ''} alt="@shadcn" />
              <AvatarFallback>
                <p className="uppercase">
                  {form.user.name![0]}
                  {form.user.name![form.user.name?.length! - 1]}
                </p>
              </AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <div className="flex items-center space-x-1">
                <h3 className="max-w-36 font-semibold leading-none truncate">
                  {form.name}
                </h3>
                {!form.published && (
                  <span className="font-medium bg-accent text-gray-500 text-xs px-2 py-0.5 rounded w-fit">
                    Draft
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-500 leading-none">
                {formatDistance(form.updatedAt, new Date(), {
                  addSuffix: true,
                })}
              </p>
            </div>
          </div>
          <CopyLinkButton value={shareUrl} />
        </div>
      </CardHeader>
      <CardFooter className="border border-t py-4">
        <div className="w-full flex items-center justify-between">
          <Link href={`/form/${form.id}/responses`}>
            <span className="bg-accent text-gray-500 text-sm px-2 py-0.5 rounded flex items-center hover:text-gray-700 hover:scale-105 transition-transform">
              <FileText className="w-4 h-4 mr-1.5 opacity-70" />
              {responses} responses
            </span>
          </Link>
          <FormCardDropdownMenu formId={form.id} />
        </div>
      </CardFooter>
    </Card>
  );
};

export default FormCard;

export const FormCardSkeleton = () => {
  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex justify-between">
          <div className="flex items-center space-x-3">
            <Skeleton className="w-10 h-10 rounded-full" />
            <div className="space-y-1">
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-4 w-28" />
            </div>
          </div>
          <Skeleton className="w-10 h-10 rounded-full" />
        </div>
      </CardHeader>
      <CardFooter className="border border-t py-4">
        <div className="w-full flex items-center justify-between">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="w-9 h-9" />
        </div>
      </CardFooter>
    </Card>
  );
};
