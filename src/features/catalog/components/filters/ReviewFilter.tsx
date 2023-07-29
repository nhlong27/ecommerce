import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Text } from '@/components/common/Text';
import { CheckedState } from '@radix-ui/react-checkbox';
import { useAtom } from 'jotai';

import helper from '@/constants/helper';
import { categoryFilterAtom, categoryRegistry, sortAtom } from '@/pages/catalogue/[[...slug]]';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import { Check} from 'lucide-react';
import { cn } from '@/lib/utils';

const ReviewFilter = () => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = useAtom(sortAtom);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className='flex gap-2 items-center '>
        Sort by: {value}
        <span>{helper.icon.chevron_up}</span>
      </PopoverTrigger>
      <PopoverContent>
        <Command>
          <CommandGroup>
            <CommandItem
              onSelect={(currentValue) => {
                setValue(currentValue === value ? '' : currentValue);
                setOpen(false);
              }}
              className={`${
                value === 'best rating' ? 'bg-gray-100 dark:bg-slate-900' : 'bg-transparent dark:bg-transparent'
              }`}
            >
              <Check
                className={cn(
                  'mr-2 h-4 w-4',
                  value === 'best rating' ? 'opacity-100' : 'opacity-0',
                )}
              />
              Best Rating
            </CommandItem>
            <CommandItem
              onSelect={(currentValue) => {
                setValue(currentValue === value ? '' : currentValue);
                setOpen(false);
              }}
              className={`${
                value === 'most reviewed' ? 'bg-gray-100 dark:bg-slate-900' : 'bg-transparent dark:bg-transparent'
              }`}
            >
              <Check
                className={cn(
                  'mr-2 h-4 w-4',
                  value === 'most reviewed' ? 'opacity-100' : 'opacity-0',
                )}
              />
              Most Reviewed
            </CommandItem>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default ReviewFilter;
