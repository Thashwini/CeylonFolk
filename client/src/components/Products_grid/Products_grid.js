import React,{ useEffect, useState} from 'react';
import {Typography,IconButton,Collapse,Box,Button,Container,Grid,Card,CardActionArea,CardActions,CardContent,CardMedia} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/styles';
import Image from '../../images/cover6.jpg';
import Collection1 from '../../images/collection1.jpg';
import Collection2 from '../../images/collection2.jpg';
import Collection3 from '../../images/collection3.jpg';
import image1 from '../../images/Products/image1.PNG';




const useStyles=makeStyles((theme)=>({
    root:{
        display:'flex',
        justifyContent:'left',
        alignItems:'center',
        height:'1000px',
        fontFamily:'Segoe UI' ,
        backgroundImage:`linear-gradient(rgba(0,0,0,0.1),rgba(0,0,0,0.1)),url(${Image})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
        position:'relative',
        padding: '100px',
        color: 'white'
      
    },
    backimage: {
        marginTop: '60px'

    },
    colorText:{
        color:'#31C5EE',
        fontSize:'4rem',
    },
    title:{
     color:'white',
     fontSize:'3rem',
     textAlign: 'left',
     fontFamily:'Segoe UI',
    },
    container:{
        textAlign:'left'
    },
    goDown:{
        color:'#fff',
        fontSize:'4rem'
    },
    collectionContainer:{
        paddingTop:'24px'
    },
    collectionTitle:{
        fontWeight:'300',
        paddingBottom:'24px',
        textAlign:'center',
        fontFamily:'Segoe UI',
        padding: '50px',
    },
    card:{
        maxWidth:'95%'
        
    },
    media:{
        height:'240px',
       
    }

}));
const Products_grid= () => {

    const classes=useStyles();
    const [checked,setChecked]=useState(false);
    useEffect(()=>{
         setChecked(true);
    },[]);

    return (
        <div className={classes.backimage}>
            {/* <Box className={classes.root} >
            <Collapse in={checked}  {...(checked ? { timeout: 1000 } : {})} collapsedHeight={50}>
            <div className={classes.container}>
                <h1 className={classes.title}>
                    YOU DECIDE<br/>
                    <span className={classes.colorText}>WE DESIGN</span>   
                </h1>
                <IconButton>
                    <ExpandMoreIcon className={classes.goDown}/>
                </IconButton>
            </div>
            </Collapse> 
            </Box> */}
            <Container className={classes.collectionContainer} maxWidth="lg">
                <Typography variant="h4" className={classes.collectionTitle}>WORK WEAR</Typography>
                
         
            <Grid container spacing={0}>
                <Grid item xs={12} sm={6} md={4}>
                         <Card className={classes.card}>
                            <CardActionArea>
                                    <CardMedia
                                    className={classes.media}
                                    style={{ backgroundImage:`url(${image1})`}}
                                    title="1"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2" style={{textAlign:'center'}}>
                                            All Time Fav WW Top
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions>
                               
                                </CardActions>
                         </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                            <Card className={classes.card}>
                                <CardActionArea>
                                        <CardMedia
                                        className={classes.media}
                                        style={{ backgroundImage:`url(${Collection2})`}}
                                        title="Marvel"
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="h2" style={{textAlign:'center'}}>
                                                Marvel
                                            </Typography>
                                        </CardContent>
                                </CardActionArea>
                                <CardActions>
                                        
                                </CardActions>
                            </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                            <Card className={classes.card}>
                                <CardActionArea>
                                        <CardMedia
                                        className={classes.media}
                                        style={{ backgroundImage:`url(${Collection3})`}}
                                        title="BTS"
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="h2" style={{textAlign:'center'}}>
                                                 BTS
                                            </Typography>
                                        </CardContent>
                                </CardActionArea>
                                <CardActions>
                                                    
                                </CardActions>
                            </Card>
                </Grid>
            </Grid>
            </Container>


        </div>
    );
};

export default Products_grid;




