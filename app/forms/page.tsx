'use client';

import MaxWidthWrapper from '@/components/max-width-wrapper';
import CreateFormDialog from './_components/create-form-dialog';
import FormCard, { FormCardSkeleton } from './_components/form-card';
import { api } from '@/lib/trpc';

const FormsDashboard = () => {
  const forms = api.form.getAll.useQuery();

  return (
    <>
      <div className="flex h-36 items-center border-b border-gray-200 bg-white">
        <MaxWidthWrapper>
          <div className="flex items-center justify-between">
            <div className="flex items-end space-x-2">
              <h1 className="text-2xl">Forms</h1>
              <span className="text-gray-600 text-lg">
                ({forms.data?.length || '0'})
              </span>
            </div>
            <div>
              <CreateFormDialog />
            </div>
          </div>
        </MaxWidthWrapper>
      </div>
      <div className="py-8">
        <MaxWidthWrapper>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {forms.isLoading &&
              [...Array(4)].map((_, i) => <FormCardSkeleton key={i} />)}
            {forms.data &&
              forms.data?.map((form) => (
                <FormCard
                  key={form.id}
                  responses={form._count.responses}
                  form={{
                    ...form,
                    createdAt: new Date(form.createdAt),
                    updatedAt: new Date(form.updatedAt),
                    user: {
                      image: form.user.image,
                      name: form.user.name,
                      email: form.user.email,
                    },
                  }}
                />
              ))}
          </div>
        </MaxWidthWrapper>
      </div>
    </>
  );
};

export default FormsDashboard;
