import React ,{useState} from 'react'
import { Button, Checkbox, Form } from 'semantic-ui-react'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./style.css"
function Login() {
  const navigate= useNavigate()
  const [admin, setAdmin]= useState({})
  const handleChange =(e)=>{
    setAdmin({...admin, [e.target.name]:e.target.value})
  }
  const handleLogin =()=>{
    axios
    .post("/api/admin/login",admin)
    .then((res)=>{
      if (res.data.status) {
          localStorage.setItem("id", res.data.data.id);
          localStorage.setItem("token", res.data.data.token);
          localStorage.setItem("isBanned", res.data.data.isBanned);
          localStorage.setItem("isVerified", res.data.data.isVerified);
          localStorage.setItem("isAdmin", res.data.data.isAdmin);
          navigate('/admin/dashbord')
      }
    })
    .catch((err)=>console.dir(err))
  }
  return (
    <div className='logad min-h-[694px] p-auto flex items-center justify-center'>

    <div className='login-container p-[50px]'>
    <Form  onChange={(e)=>handleChange(e)}>
    <Form.Field>
    <label>Email</label>
    <input placeholder='Email' name='email'/>
    </Form.Field>
    <Form.Field>
    <label>Password</label>
    <input placeholder='Password' type='password' name='password' />
    </Form.Field>
    <Form.Field>
    <Checkbox label='I agree to the Terms and Conditions' />
    </Form.Field>
    <Button onClick={handleLogin} type='submit'>Submit</Button>
    </Form>
    </div>
    </div>
  )
}

export default Login
