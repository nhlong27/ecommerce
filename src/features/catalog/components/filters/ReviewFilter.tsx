import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import helper from '@/constants/helper';
import { Command, CommandGroup, CommandItem } from '@/components/ui/command';
import { Check } from '@/components/lucide-react';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/router';

const ReviewFilter = () => {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className='flex gap-2 items-center capitalize'>
        {router.query.sortBy ? 'Sort by: ' + router.query.sortBy : 'Sort by?'}
        <span>{helper.icon.chevron_up}</span>
      </PopoverTrigger>
      <PopoverContent>
        <Command>
          <CommandGroup>
            {['best rating', 'most reviewed', 'none'].map((value, i) => (
              <CommandItem
                key={i}
                onSelect={(currentValue) => {
                  const { keyword, ...rest } = router.query;
                  switch (currentValue) {
                    case 'best rating':
                      router.push({
                        pathname: router.pathname,
                        query: { ...rest, sortBy: 'best_rating' },
                      });
                      break;
                    case 'most reviewed':
                      router.push({
                        pathname: router.pathname,
                        query: { ...rest, sortBy: 'most_reviewed' },
                      });
                      break;
                    default:
                      const { sortBy, ...moreRest } = rest;
                      router.push({
                        pathname: router.pathname,
                        query: { ...moreRest },
                      });
                      break;
                  }

                  setOpen(false);
                }}
                className={`capitalize ${
                  router.query.sortBy === value
                    ? 'bg-gray-100 dark:bg-slate-900'
                    : 'bg-transparent dark:bg-transparent'
                }`}
              >
                <Check
                  className={cn(
                    'mr-2 h-4 w-4',
                    value === router.query.sortBy ? 'opacity-100' : 'opacity-0',
                  )}
                />
                {value}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default ReviewFilter;
