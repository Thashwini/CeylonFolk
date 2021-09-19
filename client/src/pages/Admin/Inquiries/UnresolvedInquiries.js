import React, { useState, useEffect } from 'react';
import { Grid,Typography } from '@material-ui/core';
import { useForm, Form } from '../../../components/Reusable/useForm';
import Controls from '../../../components/Reusable/Controls';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import useStyles from '../style';

var contactus_id = localStorage.getItem("contactus_id");

function UnresolvedInquiries({ selectedInquiryId }) {

    const classes = useStyles();
    const [response, setResponse] = useState([]);
    
    let history = useHistory();

            
    const [listOfUnsolvedInquiries, setListOfUnsolvedInquiries] = useState([]);


    useEffect(() => {
        axios.get(`http://localhost:3001/notifications/unsolvedInquiries/${selectedInquiryId.contactus_id}`).then((response) => {
            console.log(response.data);
            setListOfUnsolvedInquiries(response.data);
        })
    }, []);

    const onFormSubmit = (e) => {

        const Data = {
            response: response,
          
        }


        axios.put(`http://localhost:3001/notifications/unsolvedInquiries/${selectedInquiryId.contactus_id}`, Data).then((response) => {
            alert('insert Successfull');
            // history.push('/collections');


        }).catch((err) => {
            console.log('err', err);
        })
    };


    const changeResponse = (e) => {
        setResponse(e.target.value);
        console.log(e.target.value);
    };
 

    return (
        <div>
             {listOfUnsolvedInquiries
                                            .map((value) => {
                                                return (
            <div>
           
            <Typography variant="h5" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Message</Typography>
            <Typography variant="h7" style={{ fontFamily: 'Montserrat' }}>{value.message}</Typography>
         
                <form onSubmit={onFormSubmit}>
                    <Grid container>
                        <Grid item xs={12}>
                            <Controls.Input
                                className={classes.response}
                                variant="outlined"
                                label="Response"
                                name="response"
                                onChange={changeResponse}
                            />
                        </Grid>
                      
                        <Controls.Button
                            type="submit"
                            text="Send The Response"
                        />
                    </Grid>

                </form>
                 
            </div>
              );
            })}
        </div >
        // {/* <Form onSubmit={handleSubmit}>
        //     <Grid container>
        //         <Grid item xs={6}>
        //             <Controls.Input
        //                 variant="outlined"
        //                 label="Collection Name"
        //                 name="collectionId"
        //                 value={values.collectionId}
        //                 onChange={handleInputChange}
        //                 error={errors.collectionId}
        //             />

        //             <Controls.Input
        //                 variant="outlined"
        //                 label="Colour"
        //                 name="collectionName"
        //                 value={values.collectionName}
        //                 onChange={handleInputChange}
        //                 error={errors.collectionName}
        //             />
        //         </Grid>
        //         <Grid item xs={6}>
        //             <Controls.Input
        //                 variant="outlined"
        //                 label="Collection Type"
        //                 name="collectionName"
        //                 value={values.collectionName}
        //                 onChange={handleInputChange}
        //                 error={errors.collectionName}
        //             />
        //             <Controls.Input
        //                 variant="outlined"
        //                 label="Cover Image"
        //                 name="collectionName"
        //                 value={values.collectionName}
        //                 onChange={handleInputChange}
        //                 error={errors.collectionName}
        //             />
        //         </Grid>
        //         <Grid item xs={12}>
        //             <div style={{ paddingTop: '20px' }}>
        //                 <Controls.Button
        //                     type="submit"
        //                     text="Add New Collection"
        //                 />

        //                 <Controls.Button
        //                     color="default"
        //                     text="Reset"
        //                     onClick={resetForm}
        //                 />
        //             </div>
        //         </Grid>
        //     </Grid>
        // </Form> */}

    );
};

export default UnresolvedInquiries;