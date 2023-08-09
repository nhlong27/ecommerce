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
import { ScrollArea } from "@/components/ui/scroll-area"
import { useRouter } from 'next/router';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

const BrandFilter = () => {
  const [open, setOpen] = React.useState(false);
  const router  = useRouter();
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className='flex gap-2 items-center capitalize'>
      {router.query.brand
          ? router.query.brand
          : 'Select brand...'}
        <span>{helper.icon.chevron_up}</span>
      </PopoverTrigger>
      <PopoverContent>
        <div className='flex flex-col gap-4'>
          <Text variant='sm/semibold/black'>Select a brand</Text>
          <Separator />
          <ScrollArea className="max-h-[400px] flex flex-col">
          <Command>
            <CommandInput placeholder='Search category...' />
            <CommandEmpty>No category found.</CommandEmpty>
            <CommandGroup>
              {categoryRegistry[router.query.category as keyof typeof categoryRegistry].brands.map((brand, i) => (
                <CommandItem
                  key={i}
                  onSelect={(currentValue) => {
                    const {keyword, ...rest}  = router.query;
                    router.push({
                      pathname: router.pathname,
                      query: {...rest, brand: currentValue}
                    })
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn('mr-2 h-4 w-4', router.query.brand === brand ? 'opacity-100' : 'opacity-0')}
                  />
                  {brand}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
          </ScrollArea>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default BrandFilter;
