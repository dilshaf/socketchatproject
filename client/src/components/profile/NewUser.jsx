import React from 'react'

const NewUser = ({newUser,handleChange,logNewUser}) => {
  return (
    <div>
         <div className='card w-100 text-center border-white'>
          <div className='row'>
            <div className='col-12'>
              <h5>Enter username</h5>
            </div>
            <div className='d-flex justify-content-center py-1'>
              <div className='col-4'>
                <input type='text' name='username' value={newUser} className='form-control' placeholder="Username" autoComplete='off' onChange={handleChange}/>
                <button className='btn-success' onClick={()=>logNewUser()}>Join</button>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default NewUser