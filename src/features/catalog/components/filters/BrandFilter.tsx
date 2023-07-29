import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Text } from '@/components/common/Text';
import { CheckedState } from '@radix-ui/react-checkbox';
import { useAtom } from 'jotai';

import helper from '@/constants/helper';
import { brandFilterAtom, brandsAtom } from '@/pages/catalogue/[[...slug]]';
import { ScrollArea } from "@/components/ui/scroll-area"

const BrandFilter = () => {
  const [brandSet, setBrandSet] = useAtom(brandFilterAtom);
  const [brands, setBrands] = useAtom(brandsAtom);
  const [isAllChecked, setIsAllChecked] = React.useState<CheckedState>(true);

  const handleCheckChange = (brand: string) => {
    if (brandSet.has(brand)) {
      brandSet.delete(brand);
      setBrandSet(new Set(brandSet));
    } else {
      brandSet.add(brand);
      setBrandSet(new Set(brandSet));
    }
    if (brandSet.size === brands.length) {
      setIsAllChecked(true);
    } else {
      setIsAllChecked(false);
    }
  };
  const handleAllChecked = () => {
    if (isAllChecked) {
      setIsAllChecked(false);
      setBrandSet(new Set());
    } else {
      setIsAllChecked(true);
      setBrandSet(new Set(brands));
    }
  };
  return (
    <Popover>
      <PopoverTrigger className='flex gap-2 items-center'>Brands 
        <span>{helper.icon.chevron_up}</span>
      </PopoverTrigger>
      <PopoverContent>
        <div className='flex flex-col gap-4'>
          <Text variant='sm/semibold/black'>Select one or many</Text>
          <div className='flex gap-4'>
            <Checkbox
              checked={isAllChecked}
              onCheckedChange={handleAllChecked}
              id='all'
            />
            <label
              htmlFor='all'
              className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 '
            >
              All
            </label>
          </div>
          <Separator />
          <ScrollArea className="max-h-[400px] w-[350px] flex flex-col">
          {brands.map((brand) => (
            <div key={brand} className='flex gap-4 py-2'>
              <Checkbox
                checked={brandSet.has(brand)}
                onCheckedChange={() => handleCheckChange(brand)}
                id={brand}
              />
              <label
                htmlFor={brand}
                className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 '
              >
                {brand}
              </label>
            </div>
          ))}
          </ScrollArea>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default BrandFilter;
