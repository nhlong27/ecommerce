import React from 'react'
import { Slider } from "@/components/ui/slider"
import { Text } from '@/components/common/Text'
import { useAtom } from 'jotai'
import { priceRangeAtom } from '@/pages/catalogue/[[...slug]]'

const PriceRange = () => {
  const [value, setValue] = useAtom(priceRangeAtom)
  return (
    <div className='flex gap-3'>
      <Text variant='base/light/black'> Price </Text>
    <Slider
      defaultValue={value}
      max={10}
      min={0.125}
      step={0.1}
      className="w-1/2 lg:w-[200px]"
      onValueChange={(value) => setValue(value)}
      />
    <Text variant='base/normal/black'> $0 - ${value}</Text>
    </div>
  )
}

export default PriceRange