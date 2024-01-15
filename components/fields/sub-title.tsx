'use client';

import {
  FormFieldInstance,
  TFields,
  TFormField,
} from '@/app/form/[formId]/editor/_components/form-fields';
import {
  SubTitleSettingsSchema,
  SubTitleSettingsSchemaType,
} from '@/schemas/fields/sub-title';
import { useEditorFields } from '@/store/use-editor-fields';
import { zodResolver } from '@hookform/resolvers/zod';
import { Heading3 } from 'lucide-react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';

const type: TFields = 'SubTitle';

const options = {
  subTitle: 'SubTitle',
};

type CustomInstance = FormFieldInstance & {
  options: typeof options;
};

export const SubTitleFormField: TFormField = {
  type,
  editorComponent: EditorComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,
  construct: (id: string) => ({
    id,
    type,
    options,
  }),
  editorBtnField: {
    icon: Heading3,
    label: 'SubTitle',
  },
  validate: (): boolean => {
    return true;
  },
};

function EditorComponent({
  fieldInstance,
}: {
  fieldInstance: FormFieldInstance;
}) {
  const field = fieldInstance as CustomInstance;

  return (
    <div className="space-y-1">
      <h3 className="text-lg font-medium">{field.options.subTitle}</h3>
    </div>
  );
}

function FormComponent({
  fieldInstance,
}: {
  fieldInstance: FormFieldInstance;
}) {
  const field = fieldInstance as CustomInstance;

  return <h3 className="text-lg font-medium">{field.options.subTitle}</h3>;
}

function PropertiesComponent({
  fieldInstance,
}: {
  fieldInstance: FormFieldInstance;
}) {
  const field = fieldInstance as CustomInstance;

  const { updateField } = useEditorFields((state) => state);

  const form = useForm<SubTitleSettingsSchemaType>({
    resolver: zodResolver(SubTitleSettingsSchema),
    mode: 'onBlur',
    defaultValues: {
      subTitle: field.options.title,
    },
  });

  useEffect(() => {
    form.reset(field.options);
  }, [field, form]);

  function saveChanges(values: SubTitleSettingsSchemaType) {
    const { subTitle } = values;
    updateField(field.id, {
      ...field,
      options: {
        subTitle,
      },
    });
  }

  return (
    <Form {...form}>
      <form
        onBlur={form.handleSubmit(saveChanges)}
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="space-y-4"
      >
        <FormField
          control={form.control}
          name="subTitle"
          render={({ field }) => (
            <FormItem className="space-y-0.5">
              <FormLabel>Subtitle</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') e.currentTarget.blur();
                  }}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
