import { generateRandomId } from '@/lib/generate-random-id';
import { cn } from '@/lib/utils';
import { useEditorFields } from '@/store/use-editor-fields';
import { DragEndEvent, useDndMonitor, useDroppable } from '@dnd-kit/core';
import { Form } from '@prisma/client';
import { MousePointerClick } from 'lucide-react';
import { useEffect } from 'react';
import EditorField, { EditorFieldSkeleton } from './editor-field';
import { TFields, formFields } from './form-fields';

type EditorProps = {
  form: Form;
};

const Editor = ({ form }: EditorProps) => {
  const {
    fields,
    setFields,
    addField,
    selectedField,
    setSelectedField,
    removeField,
  } = useEditorFields((state) => state);

  const droppable = useDroppable({
    id: 'editor-drop-area',
    data: {
      isEditorDropArea: true,
    },
  });

  useEffect(() => {
    if (form.fields && fields.length === 0) {
      const jsonFields = JSON.parse(form.fields);
      setFields(jsonFields);
    }
  }, [fields, form.fields, setFields]);

  useDndMonitor({
    onDragEnd: (event: DragEndEvent) => {
      const { active, over } = event;

      if (!active || !over) return;

      const isSidbarFieldBtn = active?.data?.current?.isSidbarFieldBtn;

      // dropping a sidebar field element over the editor
      const isDroppingOverEditorDropArea =
        over?.data?.current?.isEditorDropArea;

      if (isSidbarFieldBtn && isDroppingOverEditorDropArea) {
        const type = active?.data?.current?.type;

        const newField = formFields[type as TFields].construct(
          generateRandomId()
        );

        addField(fields.length, newField);
      }

      // dropping a sidebar field element over the existing editor fields
      const isDroppingOverEditorFieldsTopHalf =
        over?.data?.current?.isTopHalfEditorField;

      const isDroppingOverEditorFieldsBottomHalf =
        over?.data?.current?.isBottomHalfEditorField;

      const isDroppingOverEditorFields =
        isDroppingOverEditorFieldsTopHalf ||
        isDroppingOverEditorFieldsBottomHalf;

      if (isSidbarFieldBtn && isDroppingOverEditorFields) {
        const type = active?.data?.current?.type;

        const newField = formFields[type as TFields].construct(
          generateRandomId()
        );

        const overFieldIndex = fields.findIndex(
          (field) => field.id === over?.data?.current?.fieldId
        );

        let newFieldIndex = overFieldIndex;
        if (isDroppingOverEditorFieldsBottomHalf) {
          newFieldIndex = overFieldIndex + 1;
        }

        addField(newFieldIndex, newField);
      }

      // dropping a editor field over another field
      const isDroppingEditorField = active?.data?.current?.isEditorField;

      if (isDroppingOverEditorFields && isDroppingEditorField) {
        const activeFieldIndex = fields.findIndex(
          (field) => field.id === active?.data?.current?.fieldId
        );

        const overFieldIndex = fields.findIndex(
          (field) => field.id === over?.data?.current?.fieldId
        );

        const activeField = { ...fields[activeFieldIndex] };

        removeField(active?.data?.current?.fieldId);

        let newFieldIndex = overFieldIndex;
        if (isDroppingOverEditorFieldsBottomHalf) {
          newFieldIndex = overFieldIndex + 1;
        }

        addField(newFieldIndex, activeField);
      }
    },
  });

  return (
    <div
      className="flex-1 h-full p-4"
      onClick={() => {
        if (selectedField) setSelectedField(null);
      }}
    >
      <div
        ref={droppable.setNodeRef}
        className={cn(
          'h-full p-4 bg-background shadow-sm max-w-screen-md border m-auto rounded-lg flex flex-col flex-grow items-center justify-start flex-1 overflow-y-auto',
          droppable.isOver && 'ring-2 ring-primary/20'
        )}
      >
        {droppable.isOver && fields.length === 0 && (
          <div className="w-full h-24 bg-secondary rounded-md"></div>
        )}
        {!droppable.isOver && fields.length === 0 && (
          <div className="flex-grow text-gray-500 flex flex-col gap-2 items-center justify-center">
            <MousePointerClick />
            <p>
              <span className="font-bold">Drag & Drop</span> elements from right
              to build your form.
            </p>
          </div>
        )}
        {fields.length > 0 && (
          <div className="flex flex-col w-full gap-3">
            {fields.map((field) => (
              <EditorField key={field.id} field={field} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Editor;

export const EditorSkeleton = () => {
  return (
    <div className="flex-1 h-full p-4">
      <div className="h-full p-4 bg-background shadow-sm max-w-screen-md border m-auto rounded-lg flex flex-col flex-grow items-center justify-start flex-1 overflow-y-auto">
        <div className="flex flex-col w-full gap-3">
          {[...Array(4)].map((_, i) => (
            <EditorFieldSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
};
