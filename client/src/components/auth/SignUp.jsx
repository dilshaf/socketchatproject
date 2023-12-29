import { useState ,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { errorToast, successToast } from "../../Toastify/Toast";
import axios from "axios";

export default function Example() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    image: "",
    privacy: "public",
  });
  const [stateError, setStateError] = useState(false);
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [fileError, setFileError] = useState('');
  const [message, setMessage] = useState(false);
  const [isToggled, setToggled] = useState(false);
  const navigate = useNavigate();


  // const handleToggle = () => {
  // };


  // const handleInputChange = (e) => {
  //   if (e.target.name === "username") {
  //     if (Boolean(e.target.value.match(/^[a-zA-Z\s]+$/))) {
  //       setStateError(false);
  //       setMessage("");
  //     } else {
  //       setStateError(true);
  //       setMessage("invalide user name");
  //     }
  //   } else if (e.target.name === "email") {
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
  //   } else if (e.target.name === "file") {
  //     const allowedFileTypes = ["image/jpeg", "image/png"];
  //     if (
  //       e.target.files.length === 0 ||
  //       !allowedFileTypes.includes(e.target.files[0].type)
  //     ) {
  //       error = true;
  //       errorMessage = "Invalid file. Please upload a valid image file.";
  //     }
  //   }

  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (formData.username) {
      if (!formData.username.match(/^[a-zA-Z\s]+$/)) {
        setUsernameError('Invalid username');
      } else {
        setUsernameError('');
      }
    }

    if (formData.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!formData.email.match(emailRegex)) {
        setEmailError('Invalid email address');
      } else {
        setEmailError('');
      }
    }
    if (formData.password) {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
      if (!formData.password.match(passwordRegex)) {
        setPasswordError("Invalid password. Password must have at least 8 characters,oneuppercase letter, one lowercase letter, and one digit");
      } else {
        setPasswordError('');
      }
    }

    if (formData.file) {
      const allowedFileTypes = ['image/jpeg', 'image/png'];
  
      if (
        formData.file.length === 0 ||
        !allowedFileTypes.includes(formData.file[0].type)
      ) {
        setFileError('Invalid file. Please upload a valid image file.');
        error = true;
        errorMessage = 'Invalid file';
      } else {
        setFileError('');
      }
    }
    // setStateError(error);
    // setMessage(errorMessage);
  }, [formData]);


  




  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmitData = async (e) => {
    e.preventDefault();

    console.log("Form Data:", formData);

    const data = new FormData();
    data.append("username", formData.username);
    data.append("email", formData.email);
    data.append("password", formData.password);
    data.append("image", formData.image);
    data.append("privacy", isToggled ? "public" : "private");
    // console.log(formData.image,'poiuyt');
    

    try {
      const response = await axios.post(
        "http://localhost:5000/api/admin/register",
        data
      );

      console.log(response, "response");
      if (response.data) {
        navigate("/");
        successToast("success");
      }
    } catch (error) {
      console.log(error.response.data.message);
      errorToast(error.response.data.message);
    }
  };

  // const handleStattusOfProfile = (e)=>{
  //   console.log(e.target.value,'eeee')
  //   setToggled(e.target.value)
  //   setToggled(!isToggled);
  //   if(){
  //     return setToggled(true)
  //   }else if(privacy === 'private'){
  //     return setToggled(false)
  //   }
  // }

  const handleClickToggle = () => {
    setToggled(!isToggled);
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2
            style={{ color: "blue" }}
            className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 text-blue"
          >
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
                Username
              </label>
              <div className="mt-2">
                <input
                  name="username"
                  type="text"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={formData.username}
                  onChange={handleInputChange}
                />
                {/* {stateError && formData.username && (
                  <p style={{ color: "red" }}>Invalid username</p>
                )} */}

{usernameError && <div style={{color:"red"}}>{usernameError}</div>}
              </div>
            </div>



            {/* <div>

            <input
  name="privacy"
  type="text"
  required
  className="block w-full rounded-md border-2 border-gray-300 py-2 px-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
  value={formData.privacy}
  onChange={handleInputChange}
  placeholder="Public or Private"
/>
</div> */}


{/* <button onClick={handleToggle} style={{backgroundColor:"red"}}>
      {isToggled ? 'True' : 'False'}
    </button> */}


<select name="" id="" onChange={handleClickToggle} value={isToggled ? "public" : "private"}>
        <option value="public">Public</option>
        <option value="private">Private</option>
      </select>






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
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>

              {/* {stateError && formData.email && (
                <p style={{ color: "red" }}>Invalid email address</p>
              )} */}

{emailError && <div style={{color:"red"}}>{emailError}</div>}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Photo upload
              </label>
              <div className="mt-2">
                <input
                  id="pic"
                  name="pic"
                  type="file"
                  autoComplete="file"
                  accept="image/*"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  // value={formData.image}
                  onChange={handleImageChange}
                />
                {fileError && <div>{fileError}</div>}
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
                  value={formData.password}
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
          </form>
        </div>
      </div>
    </>
  );
}
