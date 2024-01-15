'use client';

import {
  FormFieldInstance,
  TFields,
  TFormField,
  TUpdateFieldValue,
} from '@/app/form/[formId]/editor/_components/form-fields';
import { cn } from '@/lib/utils';
import {
  CheckboxSettingsSchema,
  CheckboxSettingsSchemaType,
} from '@/schemas/fields/checkbox';
import { useEditorFields } from '@/store/use-editor-fields';
import { zodResolver } from '@hookform/resolvers/zod';
import { Check } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Checkbox } from '../ui/checkbox';
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

const type: TFields = 'Checkbox';

const options = {
  label: 'Checkbox',
  required: false,
};

type CustomInstance = FormFieldInstance & {
  options: typeof options;
};

export const CheckboxFormField: TFormField = {
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
    icon: Check,
    label: 'Checkbox',
  },
  validate: (formField: FormFieldInstance, currentValue): boolean => {
    const field = formField as CustomInstance;

    if (field.options.required) {
      return currentValue === 'true';
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
  const { label, required } = field.options;

  const id = `checkbox-${field.id}`;

  return (
    <div className="flex items-top space-x-2">
      <Checkbox id={id} />
      <div className="grid gap-1.5 leading-none">
        <Label htmlFor={id}>{label}</Label>
      </div>
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
  const { label } = field.options;

  const id = `checkbox-${field.id}`;

  const [value, setValue] = useState(defaultValue === 'true' ? true : false);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    setError(isInvalid === true);
  }, [isInvalid]);

  return (
    <div className="flex items-top space-x-2">
      <Checkbox
        id={id}
        checked={value}
        className={cn(error && 'border-destructive')}
        onCheckedChange={(checked) => {
          let value = false;
          if (checked === true) value = true;

          setValue(value);
          if (!updateFieldValue) return;
          const stringValue = value ? 'true' : 'false';
          const valid = CheckboxFormField.validate(field, stringValue);
          setError(!valid);
          if (!valid) return;
          updateFieldValue(field.id, stringValue);
        }}
      />
      <div className="grid gap-1.5 leading-none">
        <Label htmlFor={id}>{label}</Label>
      </div>
    </div>
  );
}

function PropertiesComponent({
  fieldInstance,
}: {
  fieldInstance: FormFieldInstance;
}) {
  const field = fieldInstance as CustomInstance;
  const { label, required } = field.options;
  const { updateField } = useEditorFields((state) => state);

  const form = useForm<CheckboxSettingsSchemaType>({
    resolver: zodResolver(CheckboxSettingsSchema),
    mode: 'onBlur',
    defaultValues: {
      label,
      required,
    },
  });

  useEffect(() => {
    form.reset(field.options);
  }, [field, form]);

  function saveChanges(values: CheckboxSettingsSchemaType) {
    const { label, required } = values;
    updateField(field.id, {
      ...field,
      options: {
        label,
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
