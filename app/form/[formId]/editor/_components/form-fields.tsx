import { ShortTextFormField } from '@/components/fields/short-text';
import { LucideIcon } from 'lucide-react';

export type TFields = 'ShortText';

export type TFormField = {
  type: TFields;

  construct: (id: string) => FormFieldInstance;

  editorBtnField: {
    icon: LucideIcon;
    label: string;
  };

  editorComponent: React.FC<{
    fieldInstance: FormFieldInstance;
  }>;

  formComponent: React.FC;

  propertiesComponent: React.FC<{
    fieldInstance: FormFieldInstance;
  }>;
};

export type FormFieldInstance = {
  id: string;
  type: TFields;
  options?: Record<string, any>;
};

type TFormFields = {
  [key in TFields]: TFormField;
};

export const formFields: TFormFields = {
  ShortText: ShortTextFormField,
};
