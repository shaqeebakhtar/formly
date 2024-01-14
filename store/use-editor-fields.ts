import { FormFieldInstance } from '@/app/form/[formId]/editor/_components/form-fields';
import { create } from 'zustand';

interface EditorFieldsStore {
  fields: FormFieldInstance[];

  addField: (index: number, field: FormFieldInstance) => void;
  removeField: (id: string) => void;

  selectedField: FormFieldInstance | null;
  setSelectedField: (field: FormFieldInstance | null) => void;

  updateField: (id: string, field: FormFieldInstance) => void;
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

const updateFieldValues = (
  state: EditorFieldsStore,
  id: string,
  field: FormFieldInstance
) => {
  const newFields = [...state.fields];
  const index = newFields.findIndex((field) => field.id === id);
  newFields[index] = field;

  return newFields;
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

  selectedField: null,
  setSelectedField: (field: FormFieldInstance | null) =>
    set(() => ({ selectedField: field })),

  updateField: (id: string, field: FormFieldInstance) =>
    set((state) => ({
      fields: updateFieldValues(state, id, field),
    })),
}));
