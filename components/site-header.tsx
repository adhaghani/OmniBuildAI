'use client';

import { useState, useEffect } from 'react';
import { Search, Bell, User2, LogOut, Settings, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SidebarTrigger } from './ui/sidebar';
import { Select, SelectItem, SelectValue, SelectContent, SelectTrigger } from '@/components/ui/select';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import { ButtonGroup } from "@/components/ui/button-group"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Kbd, KbdGroup } from "@/components/ui/kbd"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from 'next/link';
import { SUPPORTED_STANDARDS } from '@/config/constants';

export function SiteHeader() {
    const [open, setOpen] = useState(false)

    useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
          e.preventDefault();
          setOpen((open) => !open);
        }
      }
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);


  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      
      <div className="flex w-full justify-between items-center gap-1 lg:gap-2 lg:px-4">

      {/* Search */}
      <div className="flex items-center gap-2 relative w-full max-w-md">
      <SidebarTrigger/>
      <InputGroup  onClick={() => setOpen(true)}>
        <InputGroupInput placeholder="Search for materials, standards, credits..." />
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">
          <KbdGroup>
          <Kbd>⌘ + K</Kbd>
        </KbdGroup>
        </InputGroupAddon>
      </InputGroup>
        <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandList>
          <CommandInput placeholder="Type to search..." />
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Materials">
            <CommandItem>
              Concrete
              <CommandShortcut>
                <KbdGroup>
                    <Kbd>⌘ + 1</Kbd>
                </KbdGroup>
              </CommandShortcut>
            </CommandItem>
            <CommandItem>
              Insulation
              <CommandShortcut>
                <KbdGroup>
                    <Kbd>⌘ + 2</Kbd>
                </KbdGroup>
              </CommandShortcut>
            </CommandItem>
            <CommandItem>
              Glass
              <CommandShortcut>
                <KbdGroup>
                    <Kbd>⌘ + 3</Kbd>
                </KbdGroup>
              </CommandShortcut>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Standards">
            <CommandItem>
              LEED
              <CommandShortcut>
                <KbdGroup>
                    <Kbd>⌘ + L</Kbd>
                </KbdGroup>
              </CommandShortcut>
            </CommandItem>
            <CommandItem>
              BREEAM
              <CommandShortcut>
                <KbdGroup>
                    <Kbd>⌘ + B</Kbd>
                </KbdGroup>
              </CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        <ButtonGroup>
            <Button size={"sm"} variant={"outline"}>CN</Button>
            <Button size={"sm"} variant={"outline"}>EN</Button>
            </ButtonGroup>
        {/* Standard Selector */}
        <Select defaultValue={SUPPORTED_STANDARDS[0].code}>
          <SelectTrigger className="w-50">
            <SelectValue placeholder="Select Standard" />
          </SelectTrigger>
          <SelectContent>
            {SUPPORTED_STANDARDS.map((standard) => (
              <SelectItem key={standard.code} value={standard.code}>
                <span className="mr-2">{standard.logo}</span> {standard.code} - {standard.region}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500"></span>
        </Button>

        {/* User Menu */}
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='m-2'>
                <DropdownMenuItem asChild>
                    <Link href={"#"}>
                    <User2 className='size-4'/>
                    Profile
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href={"#"}>
                    <LogOut className='size-4'/>
                    Logout
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
      </div>
      </div>
    </header>
  );
}
