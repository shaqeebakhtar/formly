'use client';

import {
  TFields,
  TFormField,
} from '@/app/form/[formId]/editor/_components/form-fields';
import { SeparatorHorizontal } from 'lucide-react';
import { Separator } from '../ui/separator';

const type: TFields = 'Separator';

export const SeparatorFormField: TFormField = {
  type,
  editorComponent: EditorComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,
  construct: (id: string) => ({
    id,
    type,
  }),
  editorBtnField: {
    icon: SeparatorHorizontal,
    label: 'Separator',
  },
  validate: (): boolean => {
    return true;
  },
};

function EditorComponent() {
  return <Separator />;
}

function FormComponent() {
  return <Separator />;
}

function PropertiesComponent() {
  return (
    <div className="w-full h-48 grid place-items-center">
      <p className="font-semibold text-gray-500">
        No options to edit for separator
      </p>
    </div>
  );
}
