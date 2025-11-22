
'use client';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '../ui/button';
import { useSidebar } from '../ui/sidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import { Menu } from 'lucide-react';
import { useAuth } from '@/firebase';
import { getAuth } from 'firebase/auth';

interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  const userAvatar = PlaceHolderImages.find(img => img.id === 'user-avatar-1');
  const isMobile = useIsMobile();
  const auth = useAuth();
  
  return (
    <header className="border-b bg-card">
      <div className="flex h-16 items-center px-4 md:px-8">
        {isMobile && <Menu className='mr-4'/>}
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        <div className="ml-auto flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-9 w-9">
                  {userAvatar && <AvatarImage src={auth.currentUser?.photoURL || userAvatar.imageUrl} alt="User Avatar" data-ai-hint={userAvatar.imageHint} />}
                  <AvatarFallback>{auth.currentUser?.email?.charAt(0).toUpperCase() || 'U'}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{auth.currentUser?.displayName || auth.currentUser?.email}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {auth.currentUser?.isAnonymous ? "Anonymous User" : auth.currentUser?.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => auth.signOut()}>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
