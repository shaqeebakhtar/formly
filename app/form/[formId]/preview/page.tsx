'use client';
import { useEditorFields } from '@/store/use-editor-fields';
import React from 'react';
import { formFields } from '../editor/_components/form-fields';
import PreviewTopbar from './_components/topbar';

type FormPreviewProps = {
  params: {
    formId: string;
  };
};

const FormPreview = ({ params }: FormPreviewProps) => {
  const { fields } = useEditorFields((state) => state);

  return (
    <>
      <PreviewTopbar />
      <div className="h-full p-8">
        {fields.length > 0 && (
          <div className="h-full p-6 bg-background shadow-sm max-w-screen-sm border m-auto rounded-lg overflow-y-auto space-y-4">
            {fields.map((field) => {
              const FormField = formFields[field.type].formComponent;

              return <FormField key={field.id} fieldInstance={field} />;
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default FormPreview;
