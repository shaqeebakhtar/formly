'use client';
import React from 'react';
import FormAnalytics from './_components/form-analytics';
import ResponsesTable from './_components/responses-table';
import MaxWidthWrapper from '@/components/max-width-wrapper';
import { api } from '@/lib/trpc';

type FormResponsesProps = {
  params: {
    formId: string;
  };
};

const FormResponses = ({ params }: FormResponsesProps) => {
  const getFormResponsesById = api.form.getResponsesById.useQuery({
    formId: params.formId,
  });

  return (
    <>
      <div className="sticky left-0 right-0 top-0 z-20 border-b border-gray-200 bg-white">
        <div className="mx-auto w-full max-w-screen-3xl px-2.5 lg:px-20">
          <div className="flex h-16 items-center justify-between">Topbar</div>
        </div>
      </div>
      <div className="h-full p-8">
        <MaxWidthWrapper className="max-w-screen-2xl">
          {getFormResponsesById.data && (
            <>
              <FormAnalytics
                views={getFormResponsesById.data.views}
                submissions={getFormResponsesById.data._count.responses}
              />
              <ResponsesTable
                responses={getFormResponsesById.data.responses}
                fields={getFormResponsesById.data.fields!}
              />
            </>
          )}
        </MaxWidthWrapper>
      </div>
    </>
  );
};

export default FormResponses;
