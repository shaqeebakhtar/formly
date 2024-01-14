import React from 'react';
import { formFields } from '../form-fields';
import SidebarFieldBtn from './sidebar-field-btn';

const SidebarFields = () => {
  return (
    <div className="flex flex-wrap gap-2">
      <SidebarFieldBtn formField={formFields.ShortText} />
    </div>
  );
};

export default SidebarFields;
