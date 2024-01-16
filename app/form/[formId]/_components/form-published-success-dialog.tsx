import { Dispatch, SetStateAction, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Check, Copy } from 'lucide-react';
import { toast } from 'sonner';
import { getBaseURL } from '@/lib/utils';

type FormPublishedSuccessDialogProps = {
  formId: string;
  open: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const FormPublishedSuccessDialog = ({
  formId,
  open,
  setIsOpen,
}: FormPublishedSuccessDialogProps) => {
  const shareUrl = `${getBaseURL()}/s/${formId}`;
  const [copied, setCopied] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>🎊🎊 Form Published 🎊🎊</DialogTitle>
          <DialogDescription>
            Share this form and start collecting responses.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input id="link" defaultValue={shareUrl} readOnly />
          </div>
          <Button
            type="submit"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              setCopied(true);
              navigator.clipboard.writeText(shareUrl);
              setTimeout(() => {
                setCopied(false);
              }, 3000);
              toast.success('Link copied');
            }}
          >
            <span className="sr-only">Copy</span>
            {copied ? (
              <Check className="w-4 h-4" />
            ) : (
              <>
                <Copy className="w-4 h-4" />
              </>
            )}
          </Button>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FormPublishedSuccessDialog;
