

// import "@/styles/globals.css";


import { ToastContainer,toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

import { ChakraProvider } from '@chakra-ui/react'

 
export default function App({ Component, pageProps } : any) {
  return (
   
      <div>

        <ChakraProvider>
      

     
        <Component {...pageProps} />
<ToastContainer/>
     
</ChakraProvider>
      </div>
    
  );
}
