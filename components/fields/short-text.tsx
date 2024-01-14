'use client';

import {
  FormFieldInstance,
  TFields,
  TFormField,
} from '@/app/form/[formId]/editor/_components/form-fields';
import {
  shortTextSettingsSchema,
  shortTextSettingsSchemaType,
} from '@/schemas/fields/short-text';
import { useEditorFields } from '@/store/use-editor-fields';
import { zodResolver } from '@hookform/resolvers/zod';
import { Type } from 'lucide-react';
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
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';

const type: TFields = 'ShortText';

const options = {
  label: 'Short Text',
  placeholder: 'Placeholder',
  required: false,
  description: 'Description',
};

type CustomInstance = FormFieldInstance & {
  options: typeof options;
};

export const ShortTextFormField: TFormField = {
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
        {label}{' '}
        {required && <span className="text-destructive font-bold">*</span>}
      </Label>
      <Input readOnly placeholder={placeholder} />
      {description && (
        <p className="text-muted-foreground text-sm">{description}</p>
      )}
    </div>
  );
}

function FormComponent({
  fieldInstance,
}: {
  fieldInstance: FormFieldInstance;
}) {
  const field = fieldInstance as CustomInstance;
  const { label, placeholder, description, required } = field.options;

  return (
    <div className="space-y-1">
      <Label className="text-gray-500">
        {label}{' '}
        {required && <span className="text-destructive font-bold">*</span>}
      </Label>
      <Input placeholder={placeholder} />
      {description && (
        <p className="text-muted-foreground text-sm">{description}</p>
      )}
    </div>
  );
}

function PropertiesComponent({
  fieldInstance,
}: {
  fieldInstance: FormFieldInstance;
}) {
  const field = fieldInstance as CustomInstance;
  const { label, description, placeholder, required } = field.options;
  const { updateField } = useEditorFields((state) => state);

  const form = useForm<shortTextSettingsSchemaType>({
    resolver: zodResolver(shortTextSettingsSchema),
    mode: 'onBlur',
    defaultValues: {
      label,
      placeholder,
      required,
      description,
    },
  });

  useEffect(() => {
    form.reset(field.options);
  }, [field, form]);

  function saveChanges(values: shortTextSettingsSchemaType) {
    const { label, description, placeholder, required } = values;
    updateField(field.id, {
      ...field,
      options: {
        label,
        description,
        placeholder,
        required,
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
          name="label"
          render={({ field }) => (
            <FormItem className="space-y-0.5">
              <FormLabel>Label</FormLabel>
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
        <FormField
          control={form.control}
          name="placeholder"
          render={({ field }) => (
            <FormItem className="space-y-0.5">
              <FormLabel>Placeholder</FormLabel>
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
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="space-y-0.5">
              <FormLabel>Description</FormLabel>
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
        <FormField
          control={form.control}
          name="required"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between space-y-0 rounded-lg border py-4 px-3 shadow-sm">
              <FormLabel className="w-full">Required</FormLabel>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
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
