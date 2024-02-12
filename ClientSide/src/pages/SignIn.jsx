import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import  { signInFailure,sigInStart,signInSuccess } from "../../redux/user/userSlice";
import {  useDispatch,useSelector } from "react-redux";
import OAuth from "../components/OAuth";

function SignIn() {
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch()
 const {loading,error:error} = useSelector(state => state.user)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
     if( !formData.email || !formData.password){
      return dispatch(signInFailure('all Field are required'))
     }
    try {
     dispatch(sigInStart());
      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if(data.success === false){
       return dispatch(signInFailure(data.message))
      }
     
      if(response.ok){
        dispatch(signInSuccess(data))
        navigate('/')
      }
     console.log(data)
    } catch (error) {
     dispatch(signInFailure(error.message))
    }
  };

  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* left */}
        <div className="flex-1">
          <Link
            to="/"
            className=" whitespace-nowrap  font-bold dark:text-white text-4xl"
          >
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
              Him&apos;s{""}
            </span>
            Blog
          </Link>
          <p className="text-sm mt-5">
            Login securely to start sharing your thoughts, experiences, and
            creativity with the world.
          </p>
        </div>
        {/* right */}
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            
            <div>
              <Label value="Your Email"></Label>
              <TextInput
                type="email"
                placeholder="name@company.com"
                id="email"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Your password"></Label>
              <TextInput
                type="password"
                placeholder="******"
                id="password"
                onChange={handleChange}
              ></TextInput>
            </div>
            <Button gradientDuoTone="purpleToPink" type="submit" disabled={loading}>
           {
            loading ? (
              <>
              <Spinner size='sm'>
             
              </Spinner>   <span className="pl-3">Loading...</span>
              </>
            ):'Sign In'
           }
            </Button>
            <OAuth />
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Don&apos;t have an account?</span>
            <Link to="/signup" className="text-blue-500">
              Sign up
            </Link>
          </div>
          
          {error && (
            <Alert className="mt-5" color='failure'>
              {error}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}

export default SignIn;
