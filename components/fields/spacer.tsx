'use client';

import {
  FormFieldInstance,
  TFields,
  TFormField,
} from '@/app/form/[formId]/editor/_components/form-fields';
import {
  SpacerSettingsSchema,
  SpacerSettingsSchemaType,
} from '@/schemas/fields/spacer';
import { useEditorFields } from '@/store/use-editor-fields';
import { zodResolver } from '@hookform/resolvers/zod';
import { Space } from 'lucide-react';
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
import { Slider } from '../ui/slider';

const type: TFields = 'Spacer';

const options = {
  height: 20,
};

type CustomInstance = FormFieldInstance & {
  options: typeof options;
};

export const SpacerFormField: TFormField = {
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
    icon: Space,
    label: 'Spacer',
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
      <div style={{ height: field.options.height, width: '100%' }} />
    </div>
  );
}

function FormComponent({
  fieldInstance,
}: {
  fieldInstance: FormFieldInstance;
}) {
  const field = fieldInstance as CustomInstance;

  return <div style={{ height: field.options.height, width: '100%' }} />;
}

function PropertiesComponent({
  fieldInstance,
}: {
  fieldInstance: FormFieldInstance;
}) {
  const field = fieldInstance as CustomInstance;

  const { updateField } = useEditorFields((state) => state);

  const form = useForm<SpacerSettingsSchemaType>({
    resolver: zodResolver(SpacerSettingsSchema),
    mode: 'onBlur',
    defaultValues: {
      height: field.options.height,
    },
  });

  useEffect(() => {
    form.reset(field.options);
  }, [field, form]);

  function saveChanges(values: SpacerSettingsSchemaType) {
    const { height } = values;
    updateField(field.id, {
      ...field,
      options: {
        height,
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
          name="height"
          render={({ field }) => (
            <FormItem className="space-y-4">
              <FormLabel>Height (px): {form.watch('height')}</FormLabel>
              <FormControl>
                <Slider
                  defaultValue={[field.value]}
                  min={5}
                  max={200}
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
      </form>
    </Form>
  );
}
