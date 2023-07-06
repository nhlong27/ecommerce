
import React from 'react'
import { useGetMockDataQuery } from '../queries';

const DataPull = () => {
  const [shouldFetch, setShouldFetch] = React.useState(false)
  const { data, isLoading, error } = useGetMockDataQuery(shouldFetch);
  return (
    <div>
      <button onClick={()=>setShouldFetch(true)}>
        get Fakeapi data
      </button>
    </div>
  )
}

export default DataPull