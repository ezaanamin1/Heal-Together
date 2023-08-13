import React from 'react';
import styled from "styled-components"
import { UserContext } from '../Context/context';
import { useContext } from 'react';
import * as yup from 'yup';
import { Formik } from 'formik';
import { SignUpPost } from '../redux/slice/API';
import { useDispatch } from 'react-redux';
import { TextField } from '@mui/material';
const SignUpForm = () => {
    const dispatch=useDispatch();

    const validationSchema = yup.object({
        email: yup
          .string('Enter your email')
          .email('Invalid email')
          .required('Email is required'),
        password: yup
          .string('Enter your password')
          .min(8, 'Password should be of minimum 8 characters length')
          .required('Password is required'),
        firstName: yup.string().required('First Name is required.'),
        SurName: yup.string().required('Surname Name is required.'),
      });
const {SetCode,setverficationEmail,setExpireTime,setverficationFirstName,setverficationLastName,Coping_and_Interest_question,setCoping_and_Interest_question,Primary_Profile_question, setPrimary_Profile_question}=useContext(UserContext)
const handleSignUpAndVerification= async(values)=>{

  
    console.log(values)
    const v={
      firstName:values.firstName,
      SurName:values.SurName,
      email:values.email,
      password:values.password,
    }
  
    const promise = dispatch(SignUpPost({values:v,Question1:Coping_and_Interest_question,Question2:Primary_Profile_question}))
  
    promise.then((action) => {
      if (SignUpPost.fulfilled.match(action)) {
        SetCode( action.payload.Code);
        setExpireTime( action.payload.ExpireTime);
        setverficationEmail(values.email)
        setverficationFirstName(values.firstName);
        setverficationLastName(values.SurName);
        
  
  
      } else if (SignUpPost.rejected.match(action)) {
       alert("Error")
      }
    });
  
  
  
  
    }

    
    const SignUp=styled.div`
    
    display:flex;
    flex-direction: row;
    margin-top:10px;
    
    
    
    
    `
    const SignUpButton = styled.button`
      width: 550px;
      height: 45px;
      font-size: 25px;
    
      background-color: #b9e5e3;
      color: white;
      margin-bottom: 10px;
      border-radius: 10px;
      border-color: #b9e5e3;
    
      margin: 0 auto;
      display: block;
    
      &:hover {
        background-color: #9bcfc9;
        border-color: #9bcfc9;
      }
    `;


    const Errors=styled.p`

margin-bottom:10px;
color:red;



`


    return (
        <Formik
        initialValues={{
          email:"",
          password:"",
          firstName:"",
          SurName:"",
      
      
      
      
      
        }}
      
        
      validationSchema={validationSchema}
        
      onSubmit={(values, { setSubmitting }) => {
        handleSignUpAndVerification(values);
      
        setSubmitting(false);
      }}
      >
      
      
      
        {({  handleSubmit, setFieldValue,errors, touched }) => (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',flexDirection:"column" }}>
      
      <h4 style={{marginTop:25}}>Congratulations on Completing the Questionnaire! Just a Few Steps Left...</h4>
      
      
      <TextField style={{width:400}} 
      label="First Name"
      id="firstName"
      name="firstName"
      onChange={(event) => setFieldValue("firstName", event.target.value)} 
      
      margin="normal"
      variant="outlined"
      
      
      
      />
      
      
      
      <TextField id="outlined-basic" label="Surname" variant="outlined"
      
      name="SurName"
      style={{width:400}}
      onChange={(event) => setFieldValue("SurName", event.target.value)} 
      
      margin="normal"
      
      
      />
      
      
      
      
      <SignUp>
      {errors.firstName && touched.firstName ? (
                   <Errors>{errors.firstName}</Errors>
                 ) : null}
      
      {errors.SurName && touched.SurName ? (
                   <Errors>{errors.SurName}</Errors>
                 ) : null}
      </SignUp>
      <TextField 
         sx={{
          '@media (max-width: 600px)': {
       
          },
        }}
      
      
      
      style={{marginBottom:15,width:400,marginTop:20}}  
      label="Email Address"
      id="email"
      name="email"
      onChange={(event) => setFieldValue("email", event.target.value)} 
      
      margin="normal"
      variant="outlined"
       
       />
            {errors.email && touched.email ? (
                   <Errors>{errors.email}</Errors>
                 ) : null}
      
      <TextField style={{marginBottom:15,width:400}} 
      
      id="password"
      name="password"
      label="Password"
      type="password"
      margin="normal"
      variant="outlined"
      onChange={(event) => setFieldValue("password", event.target.value)} 
      
      
      
      />
      
      {errors.password && touched.password ? (
                   <Errors>{errors.password}</Errors>
                 ) : null}
      
      
      
      
            {/* <TermsPrivacyPolicy>By clicking Sign Up, you agree to our Terms, Privacy Policy and Cookies Policy</TermsPrivacyPolicy> */}
            
            <SignUpButton  onClick={handleSubmit} >Sign Up</SignUpButton>
            </div>
      
      
      
      
            )}
        
            </Formik>
    );
}

export default SignUpForm;