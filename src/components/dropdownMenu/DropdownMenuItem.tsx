import { Menu } from '@headlessui/react';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

interface DropdownMenuItemProps {
  href: string;
  children: React.ReactNode;
}

export default function DropdownMenuItem({ href, children }: DropdownMenuItemProps) {
  return (
    <Menu.Item>
      {(active) => (
        <a
          href={href}
          className={classNames(active ? 'bg-orange-200 dark:bg-teal-700' : '', 'block px-4 py-2 text-sm')}
        >
          {children}
        </a>
      )}
    </Menu.Item>
  );
}
