'use client';

import {
  FormFieldInstance,
  TFields,
  TFormField,
} from '@/app/form/[formId]/editor/_components/form-fields';
import {
  ParagraphSettingsSchema,
  ParagraphSettingsSchemaType,
} from '@/schemas/fields/paragraph';
import { useEditorFields } from '@/store/use-editor-fields';
import { zodResolver } from '@hookform/resolvers/zod';
import { Text } from 'lucide-react';
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
import { Textarea } from '../ui/textarea';

const type: TFields = 'Paragraph';

const options = {
  paragraph: 'Paragraph',
};

type CustomInstance = FormFieldInstance & {
  options: typeof options;
};

export const ParagraphFormField: TFormField = {
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
    icon: Text,
    label: 'Paragraph',
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
      <p className="text-sm">{field.options.paragraph}</p>
    </div>
  );
}

function FormComponent({
  fieldInstance,
}: {
  fieldInstance: FormFieldInstance;
}) {
  const field = fieldInstance as CustomInstance;

  return (
    <div className="space-y-1">
      <p className="text-sm">{field.options.paragraph}</p>
    </div>
  );
}

function PropertiesComponent({
  fieldInstance,
}: {
  fieldInstance: FormFieldInstance;
}) {
  const field = fieldInstance as CustomInstance;

  const { updateField } = useEditorFields((state) => state);

  const form = useForm<ParagraphSettingsSchemaType>({
    resolver: zodResolver(ParagraphSettingsSchema),
    mode: 'onBlur',
    defaultValues: {
      paragraph: field.options.paragraph,
    },
  });

  useEffect(() => {
    form.reset(field.options);
  }, [field, form]);

  function saveChanges(values: ParagraphSettingsSchemaType) {
    const { paragraph } = values;
    updateField(field.id, {
      ...field,
      options: {
        paragraph,
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
          name="paragraph"
          render={({ field }) => (
            <FormItem className="space-y-0.5">
              <FormLabel>Paragraph</FormLabel>
              <FormControl>
                <Textarea
                  rows={6}
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
