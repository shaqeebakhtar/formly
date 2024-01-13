import { FormFieldInstance } from '@/app/form/[formId]/editor/form-fields';
import { create } from 'zustand';

interface EditorFieldsStore {
  fields: FormFieldInstance[];
  addField: (index: number, field: FormFieldInstance) => void;
  removeField: (id: string) => void;
}

const addNewFieldAt = (
  state: EditorFieldsStore,
  index: number,
  field: FormFieldInstance
) => {
  const newFields = [...state.fields];
  newFields.splice(index, 0, field);

  return newFields;
};

const removeFieldById = (state: EditorFieldsStore, id: string) => {
  return state.fields.filter((field) => field.id !== id);
};

export const useEditorFields = create<EditorFieldsStore>((set) => ({
  fields: [],

  addField: (index: number, field: FormFieldInstance) =>
    set((state) => ({
      fields: addNewFieldAt(state, index, field),
    })),

  removeField: (id: string) =>
    set((state) => ({
      fields: removeFieldById(state, id),
    })),
}));
