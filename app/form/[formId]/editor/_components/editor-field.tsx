import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useDraggable, useDroppable } from '@dnd-kit/core';
import { Copy, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { FormFieldInstance, formFields } from './form-fields';
import { useEditorFields } from '@/store/use-editor-fields';
import { generateRandomId } from '@/lib/generate-random-id';

type EditorFieldProps = {
  field: FormFieldInstance;
};

const EditorField = ({ field }: EditorFieldProps) => {
  const [isMouseOver, setIsMouseOver] = useState(false);
  const EditorComponent = formFields[field.type].editorComponent;
  const { fields, removeField, addField, setSelectedField, selectedField } =
    useEditorFields((state) => state);

  const topHalf = useDroppable({
    id: field.id + '-top',
    data: {
      fieldId: field.id,
      type: field.type,
      isTopHalfEditorField: true,
    },
  });

  const bottomHalf = useDroppable({
    id: field.id + '-bottom',
    data: {
      fieldId: field.id,
      type: field.type,
      isBottomHalfEditorField: true,
    },
  });

  const draggable = useDraggable({
    id: field.id + '-drag-handler',
    data: {
      fieldId: field.id,
      type: field.type,
      isEditorField: true,
    },
  });

  if (draggable.isDragging) return null;

  return (
    <div
      ref={draggable.setNodeRef}
      className={cn(
        'relative cursor-pointer shadow-sm rounded-md',
        selectedField?.id === field.id && 'ring-2 ring-primary '
      )}
      onMouseEnter={() => setIsMouseOver(true)}
      onMouseLeave={() => setIsMouseOver(false)}
      {...draggable.attributes}
      {...draggable.listeners}
      onClick={(e) => {
        e.stopPropagation();
        setSelectedField(field);
      }}
    >
      <div
        ref={topHalf.setNodeRef}
        className={cn('absolute top-0 w-full h-1/2 rounded-t-md')}
      ></div>
      <div
        ref={bottomHalf.setNodeRef}
        className={cn('absolute bottom-0 w-full h-1/2 rounded-b-md')}
      ></div>
      {isMouseOver && (
        <>
          <div className="absolute inset-0 w-full h-full flex items-center justify-center ">
            <div className="flex w-full h-full rounded-md bg-gray-100/50">
              <div className="grid place-items-center flex-1 text-center top-1/2">
                <p className="text-foreground animate-pulse">Click to edit</p>
              </div>
              <div className="flex flex-col items-center justify-center flex-1 max-w-16  h-full space-y-2 rounded-r-md">
                <Button
                  variant={'outline'}
                  size={'icon'}
                  onClick={(e) => {
                    e.stopPropagation();
                    const currentFieldIndex = fields.findIndex(
                      (ele) => ele.id === field.id
                    );

                    const currentFieldCopy = { ...fields[currentFieldIndex] };

                    currentFieldCopy.id = generateRandomId();

                    let copyFieldIndex = currentFieldIndex + 1;

                    addField(copyFieldIndex, currentFieldCopy);
                  }}
                >
                  <Copy className="w-4 h-4" />
                </Button>
                <Button
                  className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
                  variant={'outline'}
                  size={'icon'}
                  onClick={(e) => {
                    e.stopPropagation();
                    removeField(field.id);
                    setSelectedField(null);
                  }}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
      {topHalf.isOver && (
        <div className="absolute top-0 w-full bg-primary h-1 rounded-md" />
      )}
      <div
        className={cn(
          'w-full bg-accent/30 px-4 py-3 rounded-md pointer-events-none'
        )}
      >
        <EditorComponent fieldInstance={field} />
      </div>
      {bottomHalf.isOver && (
        <div className="absolute bottom-0 w-full bg-primary h-1 rounded-md" />
      )}
    </div>
  );
};

export default EditorField;
