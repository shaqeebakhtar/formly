import React from 'react';
import { formFields } from './form-fields';
import SidebarFieldBtn from './sidebar-field-btn';

type Props = {};

const EditorSidebar = (props: Props) => {
  return (
    <aside className="flex-1 max-w-96 border-l border-gray-200  h-full p-4 bg-white">
      <SidebarFieldBtn formField={formFields.ShortText} />
    </aside>
  );
};

export default EditorSidebar;
