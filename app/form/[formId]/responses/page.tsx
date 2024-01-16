'use client';
import React from 'react';
import FormAnalytics from './_components/form-analytics';
import ResponsesTable from './_components/responses-table';
import MaxWidthWrapper from '@/components/max-width-wrapper';
import { api } from '@/lib/trpc';
import ResponsesTopbar from './_components/topbar';

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
      <ResponsesTopbar
        formName={getFormResponsesById.data?.name!}
        formId={params.formId}
      />
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
