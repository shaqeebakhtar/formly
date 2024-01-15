import React from 'react';
import { formFields } from '../form-fields';
import SidebarFieldBtn from './sidebar-field-btn';

const SidebarFields = () => {
  return (
    <div className="flex flex-wrap gap-2">
      <SidebarFieldBtn formField={formFields.ShortText} />
      <SidebarFieldBtn formField={formFields.Title} />
      <SidebarFieldBtn formField={formFields.SubTitle} />
      <SidebarFieldBtn formField={formFields.Paragraph} />
      <SidebarFieldBtn formField={formFields.Separator} />
      <SidebarFieldBtn formField={formFields.Spacer} />
      <SidebarFieldBtn formField={formFields.Number} />
      <SidebarFieldBtn formField={formFields.TextArea} />
      <SidebarFieldBtn formField={formFields.Select} />
      <SidebarFieldBtn formField={formFields.Checkbox} />
    </div>
  );
};

export default SidebarFields;
