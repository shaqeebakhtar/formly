'use client';
import { api } from '@/lib/trpc';
import SubmissionForm, {
  SubmissionFormSkeleton,
} from './_components/submission-form';

const FormSubmissionPage = ({
  params,
}: {
  params: {
    formId: string;
  };
}) => {
  const getFormFieldsById = api.form.getFieldsById.useQuery({
    formId: params.formId,
  });

  return (
    <div className="min-h-screen bg-gray-50 w-full flex items-center justify-center">
      <div className="mx-auto w-full max-w-screen-sm">
        <div className="w-full min-w-screen-sm bg-card p-8 rounded-lg shadow">
          {getFormFieldsById.isLoading ? (
            <SubmissionFormSkeleton />
          ) : (
            getFormFieldsById.data?.fields && (
              <SubmissionForm
                fieldsData={getFormFieldsById.data.fields}
                formId={params.formId}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default FormSubmissionPage;
