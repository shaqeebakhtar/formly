import React from 'react';

import { useEditorFields } from '@/store/use-editor-fields';
import SidebarFields from './sidebar-fields';
import FieldSettings from './field-settings';

const EditorSidebar = () => {
  const { selectedField } = useEditorFields((state) => state);

  return (
    <aside className="flex-1 max-w-96 border-l border-gray-200  h-full p-4 bg-white">
      {!selectedField && <SidebarFields />}
      {selectedField && <FieldSettings />}
    </aside>
  );
};

export default EditorSidebar;
