'use client';

import {
  FormFieldInstance,
  TFields,
  TFormField,
  TUpdateFieldValue,
} from '@/app/form/[formId]/editor/_components/form-fields';
import { cn } from '@/lib/utils';
import {
  TextAreaSettingsSchema,
  TextAreaSettingsSchemaType,
} from '@/schemas/fields/text-area';
import { useEditorFields } from '@/store/use-editor-fields';
import { zodResolver } from '@hookform/resolvers/zod';
import { ScrollText } from 'lucide-react';
import { useEffect, useState } from 'react';
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
import { Textarea } from '../ui/textarea';
import { Slider } from '../ui/slider';

const type: TFields = 'TextArea';

const options = {
  label: 'Textarea',
  placeholder: 'Placeholder',
  required: false,
  description: 'Description',
  rows: 4,
};

type CustomInstance = FormFieldInstance & {
  options: typeof options;
};

export const TextAreaFormField: TFormField = {
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
    icon: ScrollText,
    label: 'Textarea',
  },
  validate: (formField: FormFieldInstance, currentValue): boolean => {
    const field = formField as CustomInstance;

    if (field.options.required) {
      return currentValue.length > 0;
    }

    return true;
  },
};

function EditorComponent({
  fieldInstance,
}: {
  fieldInstance: FormFieldInstance;
}) {
  const field = fieldInstance as CustomInstance;
  const { label, placeholder, description, required, rows } = field.options;

  return (
    <div className="space-y-1">
      <Label className="text-gray-500">
        {label}{' '}
        {required && <span className="text-destructive font-bold">*</span>}
      </Label>
      <Textarea rows={rows} readOnly placeholder={placeholder} />
      {description && (
        <p className="text-muted-foreground text-sm">{description}</p>
      )}
    </div>
  );
}

function FormComponent({
  fieldInstance,
  updateFieldValue,
  isInvalid,
  defaultValue,
}: {
  fieldInstance: FormFieldInstance;
  updateFieldValue?: TUpdateFieldValue;
  isInvalid?: boolean;
  defaultValue?: string;
}) {
  const field = fieldInstance as CustomInstance;
  const { label, placeholder, description, required, rows } = field.options;

  const [value, setValue] = useState(defaultValue || '');
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    setError(isInvalid === true);
  }, [isInvalid]);

  return (
    <div className="space-y-1">
      <Label
        htmlFor={field.id}
        className={cn('text-gray-500', error && 'text-destructive')}
      >
        {label}{' '}
        {required && <span className="text-destructive font-bold">*</span>}
      </Label>
      <Textarea
        id={field.id}
        rows={rows}
        placeholder={placeholder}
        onChange={(e) => setValue(e.target.value)}
        onBlur={(e) => {
          if (!updateFieldValue) return;
          const valid = TextAreaFormField.validate(field, e.target.value);
          setError(!valid);
          if (!valid) return;
          updateFieldValue(field.id, e.target.value);
        }}
        value={value}
      />
      {description && (
        <p
          className={cn(
            'text-muted-foreground text-sm',
            error && 'text-destructive'
          )}
        >
          {description}
        </p>
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
  const { label, description, placeholder, required, rows } = field.options;
  const { updateField } = useEditorFields((state) => state);

  const form = useForm<TextAreaSettingsSchemaType>({
    resolver: zodResolver(TextAreaSettingsSchema),
    mode: 'onBlur',
    defaultValues: {
      label,
      placeholder,
      required,
      description,
      rows,
    },
  });

  useEffect(() => {
    form.reset(field.options);
  }, [field, form]);

  function saveChanges(values: TextAreaSettingsSchemaType) {
    const { label, description, placeholder, required, rows } = values;
    updateField(field.id, {
      ...field,
      options: {
        label,
        description,
        placeholder,
        required,
        rows,
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
          name="rows"
          render={({ field }) => (
            <FormItem className="space-y-0.5">
              <FormLabel>Rows {form.watch('rows')}</FormLabel>
              <FormControl>
                <Slider
                  defaultValue={[field.value]}
                  min={1}
                  max={10}
                  step={1}
                  onValueChange={(value) => {
                    field.onChange(value[0]);
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
