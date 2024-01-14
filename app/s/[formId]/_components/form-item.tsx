import {
  FormFieldInstance,
  TUpdateFieldValue,
  formFields,
} from '@/app/form/[formId]/editor/_components/form-fields';
import { Skeleton } from '@/components/ui/skeleton';
import React, { useRef } from 'react';

type FormItemProps = {
  field: FormFieldInstance;
  updateFieldValue: TUpdateFieldValue;
  isInvalid: boolean;
  defaultValue: string;
};

const FormItem = ({
  field,
  updateFieldValue,
  isInvalid,
  defaultValue,
}: FormItemProps) => {
  const FieldItem = formFields[field.type].formComponent;

  return (
    <FieldItem
      fieldInstance={field}
      updateFieldValue={updateFieldValue}
      isInvalid={isInvalid}
      defaultValue={defaultValue}
    />
  );
};

export default FormItem;

export const FormItemSkeleton = () => {
  return (
    <div className="w-full bg-accent/30 px-4 py-3 rounded-md space-y-2">
      <Skeleton className="h-4 w-28" />
      <Skeleton className="h-8 w-full" />
      <Skeleton className="h-4 w-40" />
    </div>
  );
};
