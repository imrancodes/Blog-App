import { useDispatch } from "react-redux"
import authService from "../../appwrite/auth"
import { logout } from "../../feature/authSlice"

const LogoutBtn = () => {
    const dispatch = useDispatch()
    const logoutHandler = () =>{
        authService.logout()
        .then(()=> (dispatch(logout())))
        .catch((err) => console.log('Logout err', err))
    }
  return (
    <button className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full' onClick={logoutHandler}>Logout</button>
  )
}

export default LogoutBtn