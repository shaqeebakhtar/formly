import React from 'react';
import FormAnalytics from './_components/form-analytics';
import { api } from '@/lib/trpc';
import ResponsesTable from './_components/responses-table';
import MaxWidthWrapper from '@/components/max-width-wrapper';

type FormResponsesProps = {
  params: {
    formId: string;
  };
};

const FormResponses = ({ params }: FormResponsesProps) => {
  // const getFormById = api.form.getById.useQuery({
  //   formId: params.formId,
  // });

  return (
    <>
      <div className="sticky left-0 right-0 top-0 z-20 border-b border-gray-200 bg-white">
        <div className="mx-auto w-full max-w-screen-3xl px-2.5 lg:px-20">
          <div className="flex h-16 items-center justify-between">Topbar</div>
        </div>
      </div>
      <div className="h-full p-8">
        <MaxWidthWrapper className="max-w-screen-2xl">
          <FormAnalytics />
          <ResponsesTable />
        </MaxWidthWrapper>
      </div>
    </>
  );
};

export default FormResponses;
