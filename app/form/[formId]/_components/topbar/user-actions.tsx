import { Button } from '@/components/ui/button';
import { Eye, Save } from 'lucide-react';
import React from 'react';

type Props = {};

const UserActions = (props: Props) => {
  return (
    <div className="flex items-center space-x-3">
      <Button variant={'outline'} size={'icon'}>
        <span className="sr-only">Save</span>
        <Save className="w-5 h-5 text-muted-foreground" />
      </Button>
      <Button variant={'outline'}>
        <Eye className="w-5 h-5 mr-2 text-muted-foreground" />
        Preview
      </Button>
      <Button>Publish</Button>
    </div>
  );
};

export default UserActions;
