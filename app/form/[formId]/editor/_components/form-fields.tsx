import { ParagraphFormField } from '@/components/fields/paragraph';
import { ShortTextFormField } from '@/components/fields/short-text';
import { SubTitleFormField } from '@/components/fields/sub-title';
import { TitleFormField } from '@/components/fields/title';
import { SeparatorFormField } from '@/components/fields/separator';
import { LucideIcon } from 'lucide-react';
import { SpacerFormField } from '@/components/fields/spacer';
import { NumberFormField } from '@/components/fields/number';
import { TextAreaFormField } from '@/components/fields/text-area';
import { SelectFormField } from '@/components/fields/select';
import { CheckboxFormField } from '@/components/fields/checkbox';
import { EmailFormField } from '@/components/fields/email';

export type TFields =
  | 'ShortText'
  | 'Email'
  | 'Title'
  | 'SubTitle'
  | 'Paragraph'
  | 'Separator'
  | 'Spacer'
  | 'Number'
  | 'TextArea'
  | 'Select'
  | 'Checkbox';

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
  Email: EmailFormField,
  Title: TitleFormField,
  SubTitle: SubTitleFormField,
  Paragraph: ParagraphFormField,
  Separator: SeparatorFormField,
  Spacer: SpacerFormField,
  Number: NumberFormField,
  TextArea: TextAreaFormField,
  Select: SelectFormField,
  Checkbox: CheckboxFormField,
};
