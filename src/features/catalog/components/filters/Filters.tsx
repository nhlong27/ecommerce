import React from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronsUpDown, Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/common/Text';

import CategoryFilter from './CategoryFilter';

const Filters = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  
  return (
    <div className='w-full lg:p-6 py-3 sticky z-20 bg-white dark:bg-slate-800 rounded-md top-12 md:top-16 flex gap-8 shadow-md'>
      <Text variant='lg/semibold/black' className='hidden lg:block'>
        Filters
      </Text>
      <div className='hidden hover:bg-gray-100 dark:hover:bg-gray-900 lg:block rounded-md border px-4 py-3 font-mono text-sm'>
      <CategoryFilter />
      </div>

      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className='w-[350px] space-y-2 block lg:hidden mx-auto'
      >
        <div className='flex items-center justify-between space-x-4 px-4'>
          <h4 className='text-sm font-semibold'>Filters</h4>
          <CollapsibleTrigger asChild>
            <Button variant='ghost' size='sm' className='w-9 p-0'>
              <ChevronsUpDown className='h-4 w-4' />
              <span className='sr-only'>Toggle</span>
            </Button>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent className='space-y-2'>
          <div className='rounded-md border px-4 py-3 font-mono text-sm'><CategoryFilter /></div>
          <div className='rounded-md border px-4 py-3 font-mono text-sm'>@stitches/react</div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default Filters;
