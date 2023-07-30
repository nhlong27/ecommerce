import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Text } from '@/components/common/Text';
import { CheckedState } from '@radix-ui/react-checkbox';
import { useAtom } from 'jotai';

import helper from '@/constants/helper';
import { categoryFilterAtom, categoryRegistry } from '@/pages/catalogue/[[...slug]]';

const CategoryFilter = () => {
  const [categorySet, setCategorySet] = useAtom(categoryFilterAtom);
  const [isAllChecked, setIsAllChecked] = React.useState<CheckedState>(
    categorySet.size < 5 ? false : true,
  );

  const handleCheckChange = (category: string) => {
    if (categorySet.has(category)) {
      categorySet.delete(category);
      setCategorySet(new Set(categorySet));
    } else {
      categorySet.add(category);
      setCategorySet(new Set(categorySet));
    }
    if (categorySet.size === Object.keys(categoryRegistry).length) {
      setIsAllChecked(true);
    } else {
      setIsAllChecked(false);
    }
  };
  const handleAllChecked = () => {
    if (isAllChecked) {
      setIsAllChecked(false);
      setCategorySet(new Set());
    } else {
      setIsAllChecked(true);
      setCategorySet(new Set(Object.keys(categoryRegistry)));
    }
  };
  return (
    <Popover>
      <PopoverTrigger className='flex gap-2 items-center'>
        Categories
        <span>{helper.icon.chevron_up}</span>
      </PopoverTrigger>
      <PopoverContent>
        <div className='flex flex-col gap-4'>
          <Text variant='sm/semibold/black'>Select one or many</Text>
          <div className='flex gap-4'>
            <Checkbox checked={isAllChecked} onCheckedChange={handleAllChecked} id='all' />
            <label
              htmlFor='all'
              className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 '
            >
              All
            </label>
          </div>
          <Separator />
          {Object.keys(categoryRegistry).map((category) => (
            <div key={category} className='flex gap-4'>
              <Checkbox
                checked={categorySet.has(category)}
                onCheckedChange={() => handleCheckChange(category)}
                id={category}
              />
              <label
                htmlFor={category}
                className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 '
              >
                {categoryRegistry[category as keyof typeof categoryRegistry].title}
              </label>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default CategoryFilter;
