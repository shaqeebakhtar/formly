import { Checkbox } from '@/components/ui/checkbox';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Response } from '@prisma/client';
import { formatRelative } from 'date-fns';
import React from 'react';
import {
  FormFieldInstance,
  TFields,
} from '../../editor/_components/form-fields';

type CustomResponse = Omit<Response, 'createdAt' | 'updatedAt'> & {
  createdAt: string;
  updatedAt: string;
};
interface ResponsesTable {
  responses: CustomResponse[];
  fields: string;
}

type Row = { [key: string]: string } & {
  submittedAt: Date;
};

const ResponsesTable = ({ responses, fields }: ResponsesTable) => {
  const formFields = JSON.parse(fields) as FormFieldInstance[];

  const columns: {
    id: string;
    label: string;
    required: boolean;
    type: TFields;
  }[] = [];

  formFields.forEach((field) => {
    switch (field.type) {
      case 'ShortText':
      case 'Email':
      case 'Number':
      case 'TextArea':
      case 'Select':
      case 'Checkbox':
        columns.push({
          id: field.id,
          label: field.options?.label,
          required: field.options?.required,
          type: field.type,
        });
        break;
      default:
        break;
    }
  });

  const rows: Row[] = [];
  responses.forEach((response) => {
    const content = JSON.parse(response.response!);
    rows.push({
      ...content,
      submittedAt: response.createdAt,
    });
  });

  return (
    <div className="w-full rounded-lg bg-card p-6 mt-6 shadow space-y-6">
      <h3 className="font-medium text-xl">Responses</h3>
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-100 hover:bg-gray-100">
            {columns.map((column) => (
              <TableHead
                className="text-gray-700 font-semibold"
                key={column.id}
              >
                {column.label}
              </TableHead>
            ))}
            <TableHead className="text-right text-gray-700 font-semibold">
              Submitted At
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              {columns.map((column) => (
                <RowCell
                  key={column.id}
                  type={column.type}
                  value={row[column.id]}
                />
              ))}
              <TableCell className="text-right">
                {formatRelative(row.submittedAt, new Date())}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ResponsesTable;

const RowCell = ({ type, value }: { type: TFields; value: string }) => {
  let node: React.ReactNode = value;

  if (type === 'Checkbox') {
    const checked = value === 'true';
    node = <Checkbox checked={checked} disabled />;
  }

  return <TableCell>{node}</TableCell>;
};
