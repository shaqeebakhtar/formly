'use client';

import {
  FormFieldInstance,
  TFields,
  TFormField,
} from '@/app/form/[formId]/editor/form-fields';
import { Type } from 'lucide-react';
import React from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';

const type: TFields = 'ShortText';

const options = {
  label: 'Short Text',
  placeholder: 'Placeholder...',
  required: false,
  description: 'Description text',
};

type CustomInstance = FormFieldInstance & {
  options: typeof options;
};

export const ShortTextFormField: TFormField = {
  type,
  editorComponent: EditorComponent,
  formComponent: () => <div>Form</div>,
  propertiesComponent: () => <div>Properties</div>,
  construct: (id: string) => ({
    id,
    type,
    options,
  }),
  editorBtnField: {
    icon: Type,
    label: 'Short Text',
  },
};

function EditorComponent({
  fieldInstance,
}: {
  fieldInstance: FormFieldInstance;
}) {
  const field = fieldInstance as CustomInstance;
  const { label, placeholder, description, required } = field.options;

  return (
    <div className="space-y-1">
      <Label className="text-gray-500">
        {label} {required && '*'}
      </Label>
      <Input readOnly placeholder={placeholder} />
      {description && (
        <p className="text-muted-foreground text-sm">{description}</p>
      )}
    </div>
  );
}
