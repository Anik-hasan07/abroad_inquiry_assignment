import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { Button } from '@mui/material';

const CountryDetails = () => {
  const { cid, cname } = useParams();
  const [countryDetails, setCountryDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountryDetails = async () => {
      try {
        const response = await axios.get(`http://dev.abroadinquiry.com:5001/get-a-country-details?cid=${cid}&cname=${cname}`);
        setCountryDetails(response.data); 
        setLoading(false);
        setError(null);
      } catch (err) {
        setLoading(false);
        setError('Error fetching country details.');
      }
    };

    fetchCountryDetails();
  }, [cid, cname]);

  if (loading) {
    return <div style={{display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",fontSize:"3rem",color:"magenta"}}>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div style={{marginLeft:"700px",marginTop:"200px"}}>
      <h2>Country Details</h2>
      <h3 style={{marginLeft:"30px"}} >name:{countryDetails.name}</h3>
      <p style={{marginLeft:"30px"}}>Capital: <strong>{countryDetails.capital}</strong></p>
      <Link to="/">
      <Button  variant="contained" color="success">Back to Homepage</Button>
      </Link>
    </div>
  );
};

export default CountryDetails;

