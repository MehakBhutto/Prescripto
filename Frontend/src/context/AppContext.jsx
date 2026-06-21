import { createContext } from "react";
import axios from 'axios'
import { useState } from "react";
import { useEffect } from "react";
  import { toast } from 'react-toastify';

export const AppContext = createContext()

const AppContextProvider = (props) => {
    const [doctors, setDoctors] = useState([])
    const [userData, setUserData] = useState(false)
    const [token, setToken] = useState(localStorage.getItem('aToken')?localStorage.getItem('aToken'):'')

    const currencySymbol = '$'
    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const getDoctorsData = async () => {
        try{
            const { data } = await axios.get(backendUrl + '/api/doctor/list')
            if(data.success){
                setDoctors(data.doctors)
            }else{
                toast.error(e.message)
            }
        }catch(e){
            console.log(e)
            toast.error(e.message)
        }
    }

    const loadingUserProfileData= async() => {
        try{
            const { data } = await axios .get(backendUrl + '/api/user/get-profile',{headers: {token}})
            if(data.success){
                setUserData(data.userData)
            }else{
                toast.error(data.message)
            }
        }catch(e){
            console.log(e)
            toast.error(e.message)
        }
    }
    const value = {
        doctors, 
        currencySymbol,token,
        setToken,backendUrl,userData,setUserData,
        getDoctorsData,
        loadingUserProfileData,
        loadUserProfileData: loadingUserProfileData
    }

    useEffect(()=>{
        getDoctorsData()
    },[])

    useEffect(() => {
        if(token){
            loadingUserProfileData()
        }else{
            setUserData(false)
        }
    },[token])

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider
