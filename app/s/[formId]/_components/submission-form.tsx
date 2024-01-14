import {
  FormFieldInstance,
  formFields,
} from '@/app/form/[formId]/editor/_components/form-fields';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import FormItem, { FormItemSkeleton } from './form-item';
import { useRef, useState } from 'react';
import { api } from '@/lib/trpc';
import { Icons } from '@/components/icons';
import { toast } from 'sonner';

const SubmissionForm = ({
  fieldsData,
  formId,
}: {
  fieldsData: string;
  formId: string;
}) => {
  const fields = JSON.parse(fieldsData) as FormFieldInstance[];

  const fieldValues = useRef<{ [key: string]: string }>({});
  const fieldErrors = useRef<{ [key: string]: boolean }>({});
  const [rederKey, setRenderKey] = useState(new Date().getTime());

  const validateForm = () => {
    for (const field of fields) {
      const actualValue = fieldValues.current[field.id] || '';

      const valid = formFields[field.type].validate(field, actualValue);

      if (!valid) {
        fieldErrors.current[field.id] = true;
      }
    }

    if (Object.keys(fieldErrors.current).length > 0) {
      return false;
    }

    return true;
  };

  const updateFieldValue = (key: string, value: string) => {
    fieldValues.current[key] = value;
  };

  const submitForm = api.form.submit.useMutation({
    onSuccess: () => {
      toast.success('Form sumbitted');
    },
  });

  const handleFormSubmit = () => {
    fieldErrors.current = {};
    const validForm = validateForm();
    if (!validForm) {
      setRenderKey(new Date().getTime());
      return;
    }

    submitForm.mutate({
      response: JSON.stringify(fieldValues.current),
      formId,
    });
  };

  return (
    <>
      <div className="space-y-4" key={rederKey}>
        {fields.map((field) => (
          <FormItem
            key={field.id}
            field={field}
            updateFieldValue={updateFieldValue}
            isInvalid={fieldErrors.current[field.id]}
            defaultValue={fieldValues.current[field.id]}
          />
        ))}
        <Button
          className="w-full"
          onClick={handleFormSubmit}
          disabled={submitForm.isLoading}
        >
          {submitForm.isLoading && (
            <Icons.spinner className="w-4 h-4 mr-2 animate-spin" />
          )}
          Submit
        </Button>
      </div>
    </>
  );
};

export default SubmissionForm;

export const SubmissionFormSkeleton = () => {
  return (
    <div className="space-y-3">
      {[...Array(4)].map((_, i) => (
        <FormItemSkeleton key={i} />
      ))}
      <Skeleton className="h-10 w-full" />
    </div>
  );
};
