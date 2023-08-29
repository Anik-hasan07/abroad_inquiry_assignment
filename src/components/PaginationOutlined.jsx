import React from 'react';
import Pagination from '@mui/material/Pagination';

export default function PaginationOutlined({ page, count, onPageChange,countries }) {
  if (countries.length === 0) {
    return null; 
  }
  return (
    <>
  {      
  countries.length > 0 &&(<Pagination
    sx={{marginLeft:"560px",marginTop:"100px"}}
      count={10}
      page={page}
      onChange={onPageChange}
      color="secondary"
    />)
    }
    </>

  );
}