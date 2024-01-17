'use client';
import MaxWidthWrapper from '@/components/max-width-wrapper';
import { api } from '@/lib/trpc';
import CreateFormDialog from './create-form-dialog';
import FormCard, { FormCardSkeleton } from './form-card';
import { useEditorFields } from '@/store/use-editor-fields';
import { useEffect } from 'react';

const Dashboard = () => {
  const forms = api.form.getAll.useQuery();

  const { setFields, setSelectedField } = useEditorFields((state) => state);

  useEffect(() => {
    setFields([]);
    setSelectedField(null);
  }, [setFields, setSelectedField]);

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
          {forms.data?.length === 0 && (
            <div className="grid place-items-center h-96">
              <div className="space-y-1 text-center">
                <p className="text-xl font-semibold">
                  You have not created any forms yet.
                </p>{' '}
                <p className="text-gray-500">
                  Click on{' '}
                  <span className="font-semibold">{`"Create form"`}</span> to
                  create one
                </p>
              </div>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {forms.isLoading &&
              [...Array(4)].map((_, i) => <FormCardSkeleton key={i} />)}
            {!forms.isLoading &&
              forms.data &&
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

export default Dashboard;
