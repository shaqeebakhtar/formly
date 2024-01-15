'use client';

import {
  FormFieldInstance,
  TFields,
  TFormField,
} from '@/app/form/[formId]/editor/_components/form-fields';
import {
  TitleSettingsSchema,
  TitleSettingsSchemaType,
} from '@/schemas/fields/title';
import { useEditorFields } from '@/store/use-editor-fields';
import { zodResolver } from '@hookform/resolvers/zod';
import { Heading } from 'lucide-react';
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

const type: TFields = 'Title';

const options = {
  title: 'Title',
};

type CustomInstance = FormFieldInstance & {
  options: typeof options;
};

export const TitleFormField: TFormField = {
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
    icon: Heading,
    label: 'Title',
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
      <h1 className="text-xl font-bold">{field.options.title}</h1>
    </div>
  );
}

function FormComponent({
  fieldInstance,
}: {
  fieldInstance: FormFieldInstance;
}) {
  const field = fieldInstance as CustomInstance;

  return <h1 className="text-xl font-bold">{field.options.title}</h1>;
}

function PropertiesComponent({
  fieldInstance,
}: {
  fieldInstance: FormFieldInstance;
}) {
  const field = fieldInstance as CustomInstance;

  const { updateField } = useEditorFields((state) => state);

  const form = useForm<TitleSettingsSchemaType>({
    resolver: zodResolver(TitleSettingsSchema),
    mode: 'onBlur',
    defaultValues: {
      title: field.options.title,
    },
  });

  useEffect(() => {
    form.reset(field.options);
  }, [field, form]);

  function saveChanges(values: TitleSettingsSchemaType) {
    const { title } = values;
    updateField(field.id, {
      ...field,
      options: {
        title,
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
          name="title"
          render={({ field }) => (
            <FormItem className="space-y-0.5">
              <FormLabel>Title</FormLabel>
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
