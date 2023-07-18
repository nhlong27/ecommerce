import React from 'react'
import { Input } from "@/components/ui/input"
import { Button } from '../ui/button'

const SearchBar = () => {
  return (
    <div className="flex w-full max-w-sm items-center space-x-2">
      <Input type="email" placeholder="Find a product" />
      <Button type="submit">Search</Button>
    </div>
  )
}

export default SearchBar