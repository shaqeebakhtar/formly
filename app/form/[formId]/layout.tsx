import React from 'react';
import Topbar from './_components/topbar';

type FormLayoutProps = {
  children: React.ReactNode;
};

const FormLayout = ({ children }: FormLayoutProps) => {
  return (
    <>
      <Topbar />
      {children}
    </>
  );
};

export default FormLayout;
