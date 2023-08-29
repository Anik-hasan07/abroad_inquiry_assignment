import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCountries } from '../rudux/countriesSlice';
import { Grid, Card, CardContent, Typography, Container, TextField } from '@mui/material';
import { useNavigate } from "react-router-dom";
import Pagination from './PaginationOutlined';

const itemsPerPage = 3;

const CountryList = () => {
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(10);
    const [searchQuery, setSearchQuery] = useState('');

    // Handle page change
    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const dispatch = useDispatch();
    const { countries, loading, error } = useSelector((state) => state.countries);
    const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(searchQuery.toLowerCase())
);
const totalItems = filteredCountries.length;
const totalPage = Math.ceil(totalItems / itemsPerPage);
  

    useEffect(() => {
        dispatch(fetchCountries());
    }, [dispatch]);

   
    if (loading) {
        return <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", fontSize: "3rem", color: "magenta" }}>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <>
          
            {page <= totalPage ? (
                <>
                  <TextField
                label="Search Country"
                variant="outlined"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ margin: '20px 10px',width:"50%" }}
                />
                <Grid container spacing={2} sx={{ mt: "80px" }}>
                    {filteredCountries.slice(startIndex, endIndex).map((country, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <CountryCard country={country} />
                        </Grid>
                    ))}
                </Grid>
                  <Pagination
                   page={page}
                   count={totalPages}
                   countries={countries}
                   onPageChange={handlePageChange}
                  
                  />
                  </>
            ) : (
                <>
                    <Typography variant="h5" sx={{display:"flex",alignItems:"center",justifyContent:"center",height:"100vh",fontSize:"2rem",fontWeight:"900px",color:"red"}}>NO ITEMS REMAIN RELORE THE PAGE
                     </Typography> 
                </>
            )}
        </>
    );
};

const CountryCard = ({ country, index }) => {
   
    const navigate = useNavigate();
    const navigateToDetails = (cid, cname) => {
        navigate(`/country/${cid}/${cname}`);
    };

    return (
        <Container maxWidth="sm">
            <Card onClick={() => navigateToDetails(country.id, country.name)} style={{ cursor: 'pointer', maxWidth: '1000px', backgroundColor: "gray" }}>
                <CardContent>
                    <Typography variant="h2">{country.name}</Typography>
                    <Typography variant="h6">Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit, quod? Quo quod voluptatem tempore dicta eius beatae earum, at suscipit alias culpa? At velit quas natus amet error cum? Inventore, qui illum. </Typography>
                </CardContent>
            </Card>
        </Container>
    );
};

export default CountryList;

