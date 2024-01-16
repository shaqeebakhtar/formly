'use client';

import {
  FormFieldInstance,
  TFields,
  TFormField,
  TUpdateFieldValue,
} from '@/app/form/[formId]/editor/_components/form-fields';
import { useEditorFields } from '@/store/use-editor-fields';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronDown, Plus, Trash2, Type } from 'lucide-react';
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
import { cn } from '@/lib/utils';
import {
  SelectSettingsSchema,
  SelectSettingsSchemaType,
} from '@/schemas/fields/select';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Separator } from '../ui/separator';
import { Button } from '../ui/button';

const type: TFields = 'Select';

const options = {
  label: 'Select',
  placeholder: 'Placeholder',
  required: false,
  description: 'Description',
  choices: [],
};

type CustomInstance = FormFieldInstance & {
  options: typeof options;
};

export const SelectFormField: TFormField = {
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
    icon: ChevronDown,
    label: 'Select',
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
  const { label, placeholder, description, required } = field.options;

  return (
    <div className="space-y-1">
      <Label className="text-gray-500">
        {label}{' '}
        {required && <span className="text-destructive font-bold">*</span>}
      </Label>
      <Select>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
      </Select>
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
  const { label, placeholder, description, required, choices } = field.options;

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
      <Select
        defaultValue={value}
        onValueChange={(value) => {
          if (!updateFieldValue) return;
          const valid = SelectFormField.validate(field, value);
          setError(!valid);
          if (!valid) return;
          updateFieldValue(field.id, value);
        }}
      >
        <SelectTrigger className={cn('w-full', error && 'border-red-500')}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {choices.map((choice) => (
            <SelectItem key={choice} value={choice}>
              {choice}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
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
  const { label, description, placeholder, required, choices } = field.options;
  const { updateField } = useEditorFields((state) => state);

  const form = useForm<SelectSettingsSchemaType>({
    resolver: zodResolver(SelectSettingsSchema),
    mode: 'onBlur',
    defaultValues: {
      label,
      placeholder,
      required,
      description,
      choices,
    },
  });

  useEffect(() => {
    form.reset(field.options);
  }, [field, form]);

  function saveChanges(values: SelectSettingsSchemaType) {
    const { label, description, placeholder, required, choices } = values;
    updateField(field.id, {
      ...field,
      options: {
        label,
        description,
        placeholder,
        required,
        choices,
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
        <Separator />
        <FormField
          control={form.control}
          name="choices"
          render={({ field }) => (
            <FormItem>
              <div className="flex justify-between items-center">
                <FormLabel>Choices</FormLabel>
                <Button
                  variant={'outline'}
                  className="gap-2 px-3"
                  onClick={(e) => {
                    e.preventDefault(); // avoid submit
                    form.setValue('choices', field.value.concat('New option'));
                  }}
                >
                  <Plus className="w-4 h-4" />
                  <span>Add</span>
                </Button>
              </div>
              <div className="flex flex-col gap-2">
                {form.watch('choices').map((choice, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between gap-1"
                  >
                    <Input
                      placeholder=""
                      value={choice}
                      onChange={(e) => {
                        field.value[index] = e.target.value;
                        field.onChange(field.value);
                      }}
                    />
                    <Button
                      variant={'ghost'}
                      size={'icon'}
                      onClick={(e) => {
                        e.preventDefault();
                        const newOptions = [...field.value];
                        newOptions.splice(index, 1);
                        field.onChange(newOptions);
                      }}
                    >
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                ))}
              </div>

              <FormMessage />
            </FormItem>
          )}
        />
        <Separator />
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
