import axios from 'axios';
import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import './Login.css';
import PageHeader from '../components/page-header/PageHeader';

export default function Login() {
  localStorage.removeItem('token');

  const checkLogin = e => {
    e.preventDefault();
    const user = {
      userId: e.target.user.value,
      password: e.target.password.value,
    };
    axios
      .post('http://localhost:5000/login', user, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(res => {
        let token = JSON.stringify(res.data);
        localStorage.setItem('token', token);
        window.location.href = '/home';
      })
      .catch(err => alert('Incorrect username or password!'));
  };

  return (
    <>
      <PageHeader type='login' />
      <div className='container'>
        <Form className='container form__login' onSubmit={checkLogin}>
          <FormGroup className='mb-2 mr-sm-2 mb-sm-0 form__row'>
            <Label for='user' className='mr-sm-2 col-lg-1 form__label'>
              User name
            </Label>
            <Input
              className='user__input'
              type='text'
              name='user'
              id='user'
              placeholder='Your user name'
            />
          </FormGroup>
          <FormGroup className='mb-2 mr-sm-2 mb-sm-0 form__row'>
            <Label for='password' className='mr-sm-2  col-lg-1 form__label'>
              Password
            </Label>
            <Input
              className='password__input'
              type='password'
              name='password'
              id='password'
              placeholder='Your Password'
            />
          </FormGroup>
          <Button type='submit' className='btn-login'>
            Login
          </Button>
        </Form>
      </div>
    </>
  );
}
