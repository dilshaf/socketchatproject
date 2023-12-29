import axios from "axios";
import React, { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { successToast, errorToast } from "../../Toastify/Toast";

export default function Example() {
  const navigate = useNavigate();

  // const [email, setEmail] = useState("");
  // const [password, setPasswrod] = useState("");
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [formdata, setFormData] = useState({
    email: "",
    password: "",
  });
  const [stateError, setStateError] = useState(false);
  const [message, setMessage] = useState(false);
  const handleSubmitData = async (e) => {
    e.preventDefault();

   
    try {
      const response = await axios.post(
        "http://localhost:5000/api/admin/login",
        formdata
      );
     
      if (response.data) {
        const { result, token } = response.data;

        localStorage.setItem("token", token);
        localStorage.setItem("username", result.username);
        localStorage.setItem("id", result._id);
        successToast("logged in");
        navigate("/home");
      }
    } catch (error) {
      errorToast(error.response.data.message);
    }
  };

  // const handleInputData = (e) => {
  //   if (e.target.name === "email") {
  //     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //     if (Boolean(e.target.value.match(emailRegex))) {
  //       setStateError(false);
  //       setMessage("");
  //     } else {
  //       setStateError(true);
  //       setMessage("Invalid email address");
  //     }
  //   } else if (e.target.name === "password") {
  //     const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  //     if (Boolean(e.target.value.match(passwordRegex))) {
  //       setStateError(false);
  //       setMessage("");
  //     } else {
  //       setStateError(true);
  //       setMessage("Invalid password");
  //     }
  //   }
  //   setFormData({ ...formdata, [e.target.name]: e.target.value });
  // };


  const handleInputChange = (e) => {
    setFormData({ ...formdata, [e.target.name]: e.target.value });
  };

  useEffect(() => {
   

    if (formdata.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!formdata.email.match(emailRegex)) {
        setEmailError('Invalid email address');
      } else {
        setEmailError('');
      }
    }
    if (formdata.password) {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
      if (!formdata.password.match(passwordRegex)) {
        setPasswordError("Invalid password. Password must have at least 8 characters,oneuppercase letter, one lowercase letter, and one digit");
      } else {
        setPasswordError('');
      }
    }


  
    
  }, [formdata]);
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            onSubmit={handleSubmitData}
            className="space-y-6"
            action="#"
            method="POST"
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={formdata.email}
                  onChange={handleInputChange}
                />
               {emailError && <div style={{color:"red"}}>{emailError}</div>}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={formdata.password}
                  onChange={handleInputChange}
                />
{passwordError && <div style={{color:"red"}}>{passwordError}</div>}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>

            <Link to="/register">
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-3"
              >
                Register Now
              </button>
            </Link>
          </form>
        </div>
      </div>
    </>
  );
}
