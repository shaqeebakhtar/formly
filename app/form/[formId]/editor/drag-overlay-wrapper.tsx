import { Active, DragOverlay, useDndMonitor } from '@dnd-kit/core';
import { useState } from 'react';
import { TFields, formFields } from './form-fields';
import { SidebarFieldBtnDragOverlay } from './sidebar-field-btn';
import { useEditorFields } from '@/store/use-editor-fields';

const DragOverlayWrapper = () => {
  const [draggedItem, setDraggedItem] = useState<Active | null>(null);
  const { fields, addField } = useEditorFields((state) => state);

  useDndMonitor({
    onDragStart: (event) => {
      setDraggedItem(event.active);
    },
    onDragCancel: () => {
      setDraggedItem(null);
    },
    onDragEnd: () => {
      setDraggedItem(null);
    },
  });

  let node = <div>Drag overlay</div>;
  const isSidbarFieldBtn = draggedItem?.data?.current?.isSidbarFieldBtn;

  if (isSidbarFieldBtn) {
    node = (
      <SidebarFieldBtnDragOverlay
        formField={formFields[draggedItem?.data?.current?.type as TFields]}
      />
    );
  }

  const isEditorField = draggedItem?.data?.current?.isEditorField;

  if (isEditorField) {
    const fieldId = draggedItem?.data?.current?.fieldId;

    const field = fields.find((field) => field.id === fieldId);

    if (!field) {
      node = <div>No selected field</div>;
    } else {
      const EditorComponent = formFields[field.type].editorComponent;

      node = (
        <div className="w-full bg-accent px-4 py-3 rounded-md pointer-events-none">
          <EditorComponent fieldInstance={field} />
        </div>
      );
    }
  }

  return <DragOverlay>{node}</DragOverlay>;
};

export default DragOverlayWrapper;
