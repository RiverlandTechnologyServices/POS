import { createContext, useContext, useState, useEffect } from "react";
import * as SecureStore from 'expo-secure-store';

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const getCurrentAccount = async () => {
  let result = await SecureStore.getItemAsync("sessionID");  
  return result;
}

const GlobalProvider = ({ children }) =>
{
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [cart, setCart] = useState([])

  useEffect(() => {
    getCurrentAccount().then((res) => {
      if(res)
      {
        setIsLoggedIn(true);
        setUser(res);
      }
      else
      {
        setIsLoggedIn(false);
        setUser(null);
      }

    }).catch(err => console.log(err)).finally(() => {
      setIsLoading(false);
    })
  }, [])
  


  return (
    <GlobalContext.Provider
      value={{
        isLoggedIn,
        setIsLoading,
        user,
        setUser,
        isLoading,
        cart,
        setCart
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

export default GlobalProvider