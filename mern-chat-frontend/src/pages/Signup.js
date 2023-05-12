/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Col, Row, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Signup.css";
import botImg from "../assets/bot.jpg";

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  //image upload states
  const [image, setImage] = useState(null);
  const [uploadingImg, setUploadingImg] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  function validateImg(e){
    const file = e.target.files[0];
    if(file.size >= 1048576){
      return alert("Max file size is 1 Mo");
    }
    else{
      setImage(file);
      setImagePreview(URL.createObjectURL(file))
    }
  }

  async function uploadImage(){
    const data = new FormData();
    data.append('file', image);
    data.append('upload_preset', 'dtjkdhoh');
    try{
      setUploadingImg(true);
      let res = await fetch('https://api.cloudinary.com/v1_1/learn-code-10/image/upload', {
        methode: 'POST',
        body: data,
      })
      const urlData = await res.json();
      setUploadingImg(false);
      return urlData.url
    } catch(error) {
      setUploadingImg(false);
      console.log(error);
    }
  }

  async function handleSignup(e){
    e.preventDefault();
    if(!image) return alert('Please upload your profile picture');
    const url = await uploadImage(image);
    console.log(url);
  }

  return (
    <Container>
      <Row>
          <Col md={7} className="d-flex align-items-center justify-content-center flex-direction-column">
            <Form onSubmit={handleSignup}>
              <div className="signup-profile-pic__container">
                <img src={ imagePreview || botImg } class="signup-profile-pic"/>
                <label htmlFor="image-upload" className="image-upload-label">
                  <i className="fa fa-plus-circle add-picture-icon"></i>
                </label>
                <input type="file" id="image-upload" hidden accept="image/png, image/jpeg" onChange={validateImg} />
              </div>
              <h1 className="text-center">Create Account</h1>
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Your Name" onChange={(e) => setName(e.target.value)} value={name} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} value={email} />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} />
              </Form.Group>
              <Button variant="success" type="submit">
                Create Account
              </Button>
              <div className="py-4">
                <p className="text-center">
                  Already have an account ? <Link to="/login">Login</Link>
                </p>
              </div>
            </Form>
          </Col>
          <Col md={5} className="signup__bg"></Col>
      </Row>
    </Container>
  );
}

export default Signup