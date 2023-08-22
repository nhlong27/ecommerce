import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { Text } from '@/components/common/Text';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import helper from '@/constants/helper';
import { categoryRegistry } from '@/pages/catalogue/[[...slug]]';
import { Check } from '@/components/lucide-react';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/router';

const CategoryFilter = () => {
  const [open, setOpen] = React.useState(false);
  const router  = useRouter();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className='flex gap-2 items-center'>
        {router.query.category
          ? categoryRegistry[router.query.category as keyof typeof categoryRegistry].title
          : 'Select category...'}
        <span>{helper.icon.chevron_up}</span>
      </PopoverTrigger>
      <PopoverContent>
        <div className='flex flex-col gap-4'>
          <Text variant='sm/semibold/black'>Select a category</Text>
          <Separator />
          <Command>
            <CommandInput placeholder='Search category...' />
            <CommandEmpty>No category found.</CommandEmpty>
            <CommandGroup>
              {Object.keys(categoryRegistry).map((category, i) => (
                <CommandItem
                  key={i}
                  onSelect={(currentValue) => {
                    const {brand, keyword, price, sortBy, ...rest} = router.query;
                    switch (currentValue) {
                      case 'coffee / tea':
                        router.push({
                          pathname: router.pathname,
                          query: {...rest, category: 'coffee_tea'}
                        })
                        break;
                      case 'energy drink':
                        router.push({
                          pathname: router.pathname,
                          query: {...rest, category: 'energy_drink'}
                        })
                        break;
                      case 'sport drink':
                        router.push({
                          pathname: router.pathname,
                          query: {...rest, category: 'sport_drink'}
                        })
                        break;
                      case 'juice shake':
                        router.push({
                          pathname: router.pathname,
                          query: {...rest, category: 'juice_shake'}
                        })
                        break;
                      default:
                        router.push({
                          pathname: router.pathname,
                          query: {...rest, category: 'water'}
                        })
                        break;
                    }
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn('mr-2 h-4 w-4', router.query.category === category ? 'opacity-100' : 'opacity-0')}
                  />
                  {categoryRegistry[category as keyof typeof categoryRegistry].title}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default CategoryFilter;
