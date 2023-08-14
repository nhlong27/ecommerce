import { setFilter } from '@/store/slices/accountSectionSlice';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

const Filter = () => {
  const filter = useSelector((state: any) => state.filterReducer.filter);
  const dispatch = useDispatch();
  return (
    <input
      type='text'
      value={filter}
      onChange={(e) => dispatch(setFilter(e.currentTarget.value))}
    />
  );
};

export default Filter;
