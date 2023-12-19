// import React from 'react'
// import {createBrowserRouter,RouterProvider} from 'react-router-dom'
// import Header from '../components/common/Header';
// import { useNavigate } from 'react-router-dom';
// import Home from '../containers/Home/Home';
// import PrivateRoutes from '../privateRoutes';


// function AppRouter() {
  
//   const router = createBrowserRouter([
//         {
//           path: "/login",
//           element: (
//             <SignIn/>
//           ),
//         },
//         {
//           path: "/register",
//           element: <SignUp/>,
//         },
//         {
            
//             path:"/",
//             element:<Home/>,
//             children:[{
//                 path:"home",
//                 element:(<div>This is home</div>)
//             }]
            
            
//         }
//       ]);
      


//   return (
//     <RouterProvider router={router} />
    
//   )
// }


// export default AppRouter

import React from 'react'

const AppRouter = () => {
  return (
    <div>AppRouter</div>
  )
}

export default AppRouter

