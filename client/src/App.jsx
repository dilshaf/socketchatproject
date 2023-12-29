import React,{useEffect,useState} from "react";

// import AppRouter from './routes/AppRouter'
// import { AuthContext } from './context/AuthContext'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import Home from "./containers/Home/Home";
import Search from "./components/profile/Search";
import Settings from "./components/profile/Settings/Settings";
import CommentSection from "./components/profile/CommentSection";
import Posts from "./components/profile/posts/Posts";
import AllPost from "./components/profile/AllPost";
import Share from "./components/profile/Share";

const App = () => {
  const[details,setDetails]=useState([])
 
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/share/:id" element={<Share/>}/>
        <Route path="/register" element={<SignUp />} />

        <Route path="/home" element={<Home />}>
          <Route path="settings" element={<Settings />} />
          <Route
            index
            path=""
            element={
              <>
                {" "}
                <Search /> {" "}
              </>
            }
          />
          <Route path="comments" element={<><Search/><CommentSection /></>} />

          <Route path="posts" element={<Posts />} />
          <Route index path="allpost" element={<AllPost details={details}/>} />
         

        </Route>
      </Routes>
    </BrowserRouter>




</>
  );
};

export default App;
