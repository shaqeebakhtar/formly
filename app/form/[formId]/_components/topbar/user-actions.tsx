import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { api } from '@/lib/trpc';
import { useEditorFields } from '@/store/use-editor-fields';
import { Eye, Save } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

type UserActionsProps = {
  formId: string;
};

const UserActions = ({ formId }: UserActionsProps) => {
  const router = useRouter();
  const { fields } = useEditorFields((state) => state);

  const saveForm = api.form.save.useMutation({
    onSuccess: () => {
      console.log('form saved');
    },
  });

  const handleSaveForm = () => {
    saveForm.mutate({
      fields: JSON.stringify(fields),
      formId,
    });
  };

  return (
    <div className="flex items-center space-x-3">
      <Button
        disabled={saveForm.isLoading}
        variant={'outline'}
        size={'icon'}
        onClick={handleSaveForm}
      >
        <span className="sr-only">Save</span>
        {saveForm.isLoading ? (
          <Icons.spinner className="w-5 h-5 animate-spin" />
        ) : (
          <Save className="w-5 h-5 text-muted-foreground" />
        )}
      </Button>
      <Button variant={'outline'} onClick={() => router.push('preview')}>
        <Eye className="w-5 h-5 mr-2 text-muted-foreground" />
        Preview
      </Button>
      <Button>Publish</Button>
    </div>
  );
};

export default UserActions;
