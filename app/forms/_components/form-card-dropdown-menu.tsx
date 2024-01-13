import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { api } from '@/lib/trpc';
import { MoreVertical } from 'lucide-react';
import Link from 'next/link';

type FormCardDropdownMenuProps = {
  formId: string;
};

const FormCardDropdownMenu = ({ formId }: FormCardDropdownMenuProps) => {
  const context = api.useContext();

  const deleteForm = api.form.delete.useMutation({
    onSuccess: () => {
      context.form.getAll.invalidate();
    },
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={'ghost'} size={'icon'}>
          <MoreVertical className="w-5 h-5 text-gray-500" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-40">
        <Link href={`/form/${formId}/editor`}>
          <DropdownMenuItem>Edit</DropdownMenuItem>
        </Link>
        <DropdownMenuItem>Rename</DropdownMenuItem>
        <Link href={`/form/${formId}/responses`}>
          <DropdownMenuItem>View Responses</DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-destructive focus:text-destructive focus:bg-destructive/10"
          onClick={() =>
            deleteForm.mutate({
              formId,
            })
          }
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FormCardDropdownMenu;
