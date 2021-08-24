import React, { useEffect, useState } from 'react';
import { CssBaseline } from '@material-ui/core';
import CommonNav from '../../components/Navbars/CommonNav';
import Footer from '../../components/Footer/Footer';
// import Product_grid from '../components/Product_grid/Product_grid';

// import { DropDown } from '../components/Product_grid/DropDown';

import { Typography, Button, Container, Grid, Card, CardActionArea, CardActions, CardContent, CardMedia, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import Image from '../../images/cover6.jpg';
import Collection1 from '../../images/ts1.jpg';
import Collection2 from '../../images/ts2.jpg';
import Collection3 from '../../images/ts3.jpg';
import Collection4 from '../../images/ts4.jpg';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import axios from 'axios';
import { useHistory } from 'react-router';
import useStyles1 from './style1';
import {setProducts, fetchProducts} from '../../_actions/productAction'
import {useDispatch, useSelector} from "react-redux";


const Shop = () => {

    const classes = useStyles1();
    const [checked, setChecked] = useState(false);

    const products = useSelector((state)=>state.productReducer.productObject)
    console.log(products)
    const dispatch = useDispatch();

    // const fetchProducts = async () =>{
    //     axios.get('http://localhost:3001/shop').then((response) => {
    //       // setProductObject(response.data);
    //       console.log(response.data[0])
    //       console.log('hello from response from server')
    //       dispatch(setProducts(response.data))
    //     });
    
    //   }

    useEffect(() => {
        dispatch(fetchProducts());
        setChecked(true);
    }, []);

    console.log('hello from product store')

   console.log(products)

    const [listOfDesigns, setListOfDesigns] = useState([]);

    // useEffect(() => {
    //     axios.get("http://localhost:3001/shop").then((response) => {
    //         setListOfDesigns(response.data);
    //     });
    // }, []);

    let history = useHistory()


    return (
        <div>
            <CssBaseline />
            <CommonNav />


            <div>

                <center>
                    <Typography variant="h4" className={classes.collectionTitle}>SHOP</Typography>
                    <Grid item md={6}>
                        <div className={classes.filter}>
                            <ButtonGroup variant="contained" color="primary" aria-label="split button" style={{ boxShadow: 'none' }}>
                                <select className={classes.icon}>
                                    <option value="">Collection</option>
                                    <option value="1">Snowy</option>
                                    <option value="0">Marvel</option>
                                </select>
                            </ButtonGroup>
                            <ButtonGroup variant="contained" color="primary" aria-label="split button" style={{ boxShadow: 'none' }}>
                                <select className={classes.icon}>
                                    <option value="">Material</option>
                                    <option value="1">Cotton</option>
                                    <option value="0">Wet look</option>
                                </select>
                            </ButtonGroup>
                            <ButtonGroup variant="contained" color="primary" aria-label="split button" style={{ boxShadow: 'none' }}>
                                <select className={classes.icon}>
                                    <option value="">color</option>
                                    <option value="1">Black</option>
                                    <option value="0">White</option>
                                </select>
                            </ButtonGroup>
                            <ButtonGroup variant="contained" color="primary" aria-label="split button" style={{ boxShadow: 'none' }}>
                                <select className={classes.icon}>
                                    <option value="">Size</option>
                                    <option value="1">Small</option>
                                    <option value="0">Medium</option>
                                </select>
                            </ButtonGroup>
                            <Button variant="contained" color="primary">
                                Filter
                            </Button>
                        </div>
                    </Grid>
                </center>

                <Container className={classes.collectionContainer} maxWidth="lg">
                    <Grid container spacing={0} >

                        {products.map((product) => {
                            const{id, coverImage, design_name, price}=product;
                            return (
                                <Grid item xs={12} sm={6} md={3} onClick={() => {
                                    history.push(`/productDetails/${id}`);
                                }}>
                                    <Link>
                                        <Card className={classes.card}>
                                            <CardActionArea>
                                                <CardMedia
                                                    className={classes.media}
                                                    style={{ backgroundImage: `url('http://localhost:3001/${coverImage}')`
                                                }}
                                                    title="Snowy"
                                                />

                                                <CardContent>
                                                    <div>
                                                        <Typography gutterBottom variant="h9" component="h2" style={{ textAlign: 'left', fontSize:'20px'}}>{design_name}</Typography>
                                                        
                                                    </div>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                    <Typography gutterBottom variant="h6" component="h2" style={{ textAlign: 'left', fontSize:'20px'}}>{"LKR " + price}</Typography>
                                                        <FavoriteBorderOutlinedIcon className={classes.icon1} /></div>
                                                </CardContent>
                                            </CardActionArea>
                                            <CardActions></CardActions>
                                        </Card>
                                    </Link>
                                </Grid>

                            );
                        })}
                    </Grid>
                </Container>
            </div>
            <Footer />
        </div>
    );
};

export default Shop;