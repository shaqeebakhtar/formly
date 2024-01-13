import { Home } from 'lucide-react';
import React from 'react';
import Navigation from './navigation';
import UserActions from './user-actions';

type TopbarProps = {
  formName: string;
  formId: string;
};

const Topbar = ({ formName, formId }: TopbarProps) => {
  return (
    <div className="sticky left-0 right-0 top-0 z-20 border-b border-gray-200 bg-white">
      <div className="mx-auto w-full max-w-screen-3xl px-2.5 lg:px-20">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-1.5 text-gray-700">
            <Home className="w-4 h-4" />
            <span>/</span>
            <p className="font-medium text-sm">{formName}</p>
          </div>
          <Navigation formId={formId} />
          <UserActions />
        </div>
      </div>
    </div>
  );
};

export default Topbar;
