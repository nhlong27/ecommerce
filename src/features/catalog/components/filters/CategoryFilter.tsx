import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Text } from '@/components/common/Text';
import { CheckedState } from '@radix-ui/react-checkbox';
import { useAtom } from 'jotai';
import { categoryFilterAtom } from '../ProductList';


const categories = {
  coffee_tea: 'Coffee / Tea',
  energy_drink: 'Energy drink',
  juice_shake: 'Juice shake',
  sport_drink: 'Sport drink',
  water: 'Water',
};

const CategoryFilter = () => {
  const [categorySet, setCategorySet] = useAtom(categoryFilterAtom);
  const [isAllChecked, setIsAllChecked] = React.useState<CheckedState>(true);

  const handleCheckChange = (category: string) => {
    if (categorySet.has(category)) {
      categorySet.delete(category);
      setCategorySet(new Set(categorySet));
    } else {
      categorySet.add(category);
      setCategorySet(new Set(categorySet));
    }
    if (categorySet.size === Object.keys(categories).length) {
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
      setCategorySet(new Set(Object.keys(categories)));
    }
  };
  return (
    <Popover>
      <PopoverTrigger>Categories</PopoverTrigger>
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
          {Object.keys(categories).map((category) => (
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
                {categories[category as keyof typeof categories]}
              </label>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default CategoryFilter;
