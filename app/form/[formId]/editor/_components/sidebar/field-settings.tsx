import { useEditorFields } from '@/store/use-editor-fields';
import React from 'react';
import { formFields } from '../form-fields';

const FieldSettings = () => {
  const { selectedField } = useEditorFields((state) => state);

  if (!selectedField) return null;

  const SettingsForm = formFields[selectedField.type].propertiesComponent;

  return (
    <>
      <p>Edit field properties</p>
      <SettingsForm fieldInstance={selectedField} />
    </>
  );
};

export default FieldSettings;
