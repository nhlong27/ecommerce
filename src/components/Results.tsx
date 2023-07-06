import React from 'react'
import { useSelector } from 'react-redux'

const Results = () => {
  const filter = useSelector((state: any) => state.filterReducer.filter)
  return (
    <div>Results: {filter}</div>
  )
}

export default Results