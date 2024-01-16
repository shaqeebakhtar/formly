'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LogOut, Settings2 } from 'lucide-react';
import { signOut } from 'next-auth/react';
import Link from 'next/link';

type UserProfileDropdownProps = {
  imageUrl: string;
  name: string;
  email: string;
};

const UserProfileDropdown = ({
  imageUrl,
  name,
  email,
}: UserProfileDropdownProps) => {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar>
              <AvatarImage src={imageUrl} />
              <AvatarFallback className="font-semibold uppercase">
                {name[0]}
                {name[name.length - 1]}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 font-medium" align="end">
          <DropdownMenuLabel className="flex items-center space-x-2 py-3">
            <Avatar>
              <AvatarImage src={imageUrl} />
              <AvatarFallback className="font-semibold uppercase">
                {name[0]}
                {name[name.length - 1]}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col space-y-1 overflow-hidden">
              <p className="text-sm truncate">{name}</p>
              <p className="text-xs leading-none truncate">{email}</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <Link href="/settings">
              <DropdownMenuItem>
                <Settings2 className="w-4 h-4 mr-2" />
                Settings
              </DropdownMenuItem>
            </Link>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => signOut({ callbackUrl: '/login' })}>
            <LogOut className="w-4 h-4 mr-2 rotate-180" />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default UserProfileDropdown;
