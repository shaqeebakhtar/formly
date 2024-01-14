'use client';
import { api } from '@/lib/trpc';
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import Topbar from '../_components/topbar';
import DragOverlayWrapper from './_components/drag-overlay-wrapper';
import Editor from './_components/editor';
import EditorSidebar from './_components/sidebar/sidebar';
import { useId } from 'react';

type FormEditorProps = {
  params: {
    formId: string;
  };
};

const FormEditor = ({ params }: FormEditorProps) => {
  const getFormById = api.form.getById.useQuery({
    formId: params.formId,
  });

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  });

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 300,
      tolerance: 5,
    },
  });

  const sensors = useSensors(mouseSensor, touchSensor);

  const id = useId();

  return (
    <>
      <Topbar formName={getFormById.data?.name!} formId={params.formId} />
      <DndContext sensors={sensors} id={id}>
        <div className="w-full flex h-[calc(100vh-66px)]">
          <Editor
            form={{
              ...getFormById.data,
              id: getFormById.data?.id!,
              name: getFormById.data?.name!,
              published: getFormById.data?.published!,
              fields: getFormById.data?.fields!,
              views: getFormById.data?.views!,
              userId: getFormById.data?.userId!,
              createdAt: new Date(getFormById?.data?.createdAt!),
              updatedAt: new Date(getFormById?.data?.updatedAt!),
            }}
          />
          <EditorSidebar />
        </div>
        <DragOverlayWrapper />
      </DndContext>
    </>
  );
};

export default FormEditor;
