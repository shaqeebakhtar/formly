import React from 'react';
import Topbar from './_components/topbar';

type FormLayoutProps = {
  children: React.ReactNode;
};

const FormLayout = ({ children }: FormLayoutProps) => {
  return <div className="min-h-screen w-full bg-gray-50">{children}</div>;
};

export default FormLayout;
