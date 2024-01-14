import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { api } from '@/lib/trpc';
import { useEditorFields } from '@/store/use-editor-fields';
import { Eye, Save } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import FormPublishedSuccessDialog from '../form-published-success-dialog';

type UserActionsProps = {
  formId: string;
};

const UserActions = ({ formId }: UserActionsProps) => {
  const router = useRouter();
  const { fields } = useEditorFields((state) => state);
  const [openPublishSuccessModal, setOpenPublishSuccessModal] = useState(false);

  const saveForm = api.form.save.useMutation({
    onSuccess: () => {
      toast.success('Form saved successfully.');
    },
  });

  const publishForm = api.form.publish.useMutation({
    onSuccess: () => {
      setOpenPublishSuccessModal(true);
    },
  });

  const handleSaveForm = () => {
    saveForm.mutate({
      fields: JSON.stringify(fields),
      formId,
    });
  };

  const handlePublishForm = () => {
    publishForm.mutate({
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
      <Button onClick={handlePublishForm} disabled={publishForm.isLoading}>
        {publishForm.isLoading && (
          <Icons.spinner className="w-4 h-4 animate-spin mr-2" />
        )}
        Publish
      </Button>
      <FormPublishedSuccessDialog
        formId={formId}
        open={openPublishSuccessModal}
        setIsOpen={setOpenPublishSuccessModal}
      />
    </div>
  );
};

export default UserActions;
