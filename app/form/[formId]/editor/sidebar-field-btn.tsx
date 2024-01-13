import React from 'react';
import { TFormField } from './form-fields';
import { Button } from '@/components/ui/button';
import { useDraggable } from '@dnd-kit/core';
import { cn } from '@/lib/utils';

type SidebarFieldBtnProps = {
  formField: TFormField;
};

const SidebarFieldBtn = ({ formField }: SidebarFieldBtnProps) => {
  const { icon: Icon, label } = formField.editorBtnField;
  const draggable = useDraggable({
    id: `sidebar-btn-${formField.type}`,
    data: {
      type: formField.type,
      isSidbarFieldBtn: true,
    },
  });

  return (
    <Button
      ref={draggable.setNodeRef}
      {...draggable.listeners}
      {...draggable.attributes}
      variant={'outline'}
      className={cn(
        'flex flex-col space-y-2 h-20 w-20',
        draggable.isDragging && 'ring-2 ring-primary'
      )}
    >
      <Icon className="h-6 w-6 text-primary" />
      <p className="text-xs">{label}</p>
    </Button>
  );
};

export default SidebarFieldBtn;

export const SidebarFieldBtnDragOverlay = ({
  formField,
}: SidebarFieldBtnProps) => {
  const { icon: Icon, label } = formField.editorBtnField;

  return (
    <Button variant={'outline'} className="flex flex-col space-y-2 h-24 w-24">
      <Icon className="h-8 w-8" />
      <p>{label}</p>
    </Button>
  );
};
