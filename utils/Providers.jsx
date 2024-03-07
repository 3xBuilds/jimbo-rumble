'use client';

//Context
import { GlobalContextProvider } from '../context/MainContext';

const Providers = ({ children }) => {

  return (
      <GlobalContextProvider>
          {children}
      </GlobalContextProvider>
  )
}

export default Providers