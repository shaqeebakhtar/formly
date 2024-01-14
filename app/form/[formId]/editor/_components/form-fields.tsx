import { ShortTextFormField } from '@/components/fields/short-text';
import { LucideIcon } from 'lucide-react';

export type TFields = 'ShortText';

export type TUpdateFieldValue = (key: string, value: string) => void;

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

  formComponent: React.FC<{
    fieldInstance: FormFieldInstance;
    updateFieldValue?: TUpdateFieldValue;
    isInvalid?: boolean;
    defaultValue?: string;
  }>;

  propertiesComponent: React.FC<{
    fieldInstance: FormFieldInstance;
  }>;

  validate: (formField: FormFieldInstance, currentValue: string) => boolean;
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
