import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer';
import { useContext } from 'react';
import { FormsContext } from '../providers/FormsProvider';
import AddDeckForm from './Forms/AddDeckForm';
import EditDeckForm from './Forms/EditDeckForm';
import EditCardForm from './Forms/EditCardForm';
import AddCardForm from './Forms/AddCardForm';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Layout() {
   const { isAddFormOpened, isEditFormOpened, isEditCardFormOpened, isAddCardFormOpened } =
      useContext(FormsContext);

   return (
      <>
         <Header />
         <main className='page-main'>
            <Outlet />
            {isAddFormOpened && <AddDeckForm />}
            {isEditFormOpened && <EditDeckForm />}
            {isEditCardFormOpened && <EditCardForm />}
            {isAddCardFormOpened && <AddCardForm />}
         </main>
         <Footer />
         <ToastContainer closeOnClick pauseOnHover theme='colored' pauseOnFocusLoss={false} />
      </>
   )
}
