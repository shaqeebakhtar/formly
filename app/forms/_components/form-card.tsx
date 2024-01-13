import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardFooter, CardHeader } from '@/components/ui/card';
import { Copy, FileText, MoreVertical, Share2 } from 'lucide-react';

const FormCard = () => {
  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="w-9 h-9">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="space-y-0.5">
              <div className="flex items-center space-x-1">
                <h3 className="w-36 font-semibold leading-none truncate">
                  Demo Introduction
                </h3>
                <span className="font-medium bg-accent text-gray-500 text-xs px-2 py-0.5 rounded w-fit">
                  Draft
                </span>
              </div>
              <p className="text-sm text-gray-500 leading-none">4 hrs ago</p>
            </div>
          </div>
          <Button
            variant={'secondary'}
            size={'icon'}
            className="group rounded-full text-gray-500 hover:bg-primary/10 hover:text-primary"
          >
            <Share2 className="w-4 h-4 group-hover:hidden" />
            <Copy className="w-4 h-4 hidden group-hover:block" />
          </Button>
        </div>
      </CardHeader>
      <CardFooter className="border border-t py-4">
        <div className="w-full flex items-center justify-between">
          <span className="bg-accent text-gray-500 text-sm px-2 py-0.5 rounded flex items-center">
            <FileText className="w-4 h-4 mr-1.5 opacity-70" />
            32 responses
          </span>
          <Button variant={'ghost'} size={'icon'}>
            <MoreVertical className="w-5 h-5 text-gray-500" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default FormCard;
