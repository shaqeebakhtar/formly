import { useEditorFields } from '@/store/use-editor-fields';
import React from 'react';
import { formFields } from '../form-fields';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

const FieldSettings = () => {
  const { selectedField, setSelectedField } = useEditorFields((state) => state);

  if (!selectedField) return null;

  const SettingsForm = formFields[selectedField.type].propertiesComponent;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold">
          Edit {selectedField.type} options
        </p>
        <Button
          size={'icon'}
          variant={'ghost'}
          onClick={() => setSelectedField(null)}
        >
          <X className="w-5 h-5" />
        </Button>
      </div>
      <SettingsForm fieldInstance={selectedField} />
    </div>
  );
};

export default FieldSettings;
