import React from 'react';
import { Slider } from '@/components/ui/slider';
import { Text } from '@/components/common/Text';
import { useRouter } from 'next/router';
import { Button } from '@/components/ui/button';

const PriceRange = () => {
  const router = useRouter();
  const [value, setValue] = React.useState(router.query.price ? Number(router.query.price) : 10);
  const [shouldUpdate, setShouldUpdate] = React.useState(false);
  console.log(value);
  return (
    <div className='flex gap-3 items-center'>
      <Text variant='base/light/black'> Price </Text>
      <Slider
        defaultValue={[value]}
        max={10}
        min={0.125}
        step={0.1}
        className='w-[150px] lg:w-[180px]'
        onValueChange={(value) => {
          setValue(value[0]), setShouldUpdate(true);
        }}
      />
      <Text variant='base/normal/black'> $0 - ${value}</Text>
      {shouldUpdate && (
        <Button
          variant='secondary'
          className='ml-auto'
          onClick={() => {
            const { keyword, ...rest } = router.query;
            router.push({
              pathname: router.pathname,
              query: { ...rest, price: value },
            });
          }}
        >
          Update
        </Button>
      )}
    </div>
  );
};

export default PriceRange;
