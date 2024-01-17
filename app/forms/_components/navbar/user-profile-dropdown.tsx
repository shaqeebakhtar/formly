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
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

const UserProfileDropdown = () => {
  const { data: session } = useSession();

  return (
    <>
      {session && session.user && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <UserAvatar
                imageUrl={session?.user.image || ''}
                name={session?.user.name!}
              />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 font-medium" align="end">
            <DropdownMenuLabel className="flex items-center space-x-2 py-3">
              <UserAvatar
                imageUrl={session?.user.image || ''}
                name={session?.user.name!}
              />
              <div className="flex flex-col space-y-1 overflow-hidden">
                <p className="text-sm truncate">{session?.user.name}</p>
                <p className="text-xs leading-none truncate">
                  {session?.user.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <Link href="/forms">
                <DropdownMenuItem>
                  <Settings2 className="w-4 h-4 mr-2" />
                  Settings
                </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => signOut({ callbackUrl: '/register' })}
            >
              <LogOut className="w-4 h-4 mr-2 rotate-180" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  );
};

export default UserProfileDropdown;

type UserAvatarProps = {
  imageUrl: string;
  name: string;
};

const UserAvatar = ({ imageUrl, name }: UserAvatarProps) => {
  return (
    <Avatar>
      <AvatarImage src={imageUrl} />
      <AvatarFallback className="font-semibold uppercase">
        {name[0]}
        {name[name.length - 1]}
      </AvatarFallback>
    </Avatar>
  );
};
