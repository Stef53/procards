import React from 'react';
import { Link } from 'react-router-dom';
import { WithAuth } from '../hoc/withAuth';
import { AuthService } from '../services/authService';
import { useUser } from '../hooks/useUser';
import Loading from './Loading/Loading';

function Account() {
   const { isLoading, data: user } = useUser();

   if (isLoading) return <Loading />

   return (
      <div className='account__wrapper'>
         <div className='account__info'>
            <h1 id='account__name'>{user.firstName} {user.lastName}</h1>
            <h3>@{user.login}</h3>
            <p>{user.location}</p>
         </div>
         <ul className='account-stat'>
            <li>
               <svg width="35" height="35" viewBox="0 0 35 35" xmlns="http://www.w3.org/2000/svg">
                  <g mask="url(#mask0_112_1167)">
                     <path d="M18.9583 13.125V4.375H30.625V13.125H18.9583ZM4.375 18.9583V4.375H16.0417V18.9583H4.375ZM18.9583 30.625V16.0417H30.625V30.625H18.9583ZM4.375 30.625V21.875H16.0417V30.625H4.375ZM7.29167 16.0417H13.125V7.29167H7.29167V16.0417ZM21.875 27.7083H27.7083V18.9583H21.875V27.7083ZM21.875 10.2083H27.7083V7.29167H21.875V10.2083ZM7.29167 27.7083H13.125V24.7917H7.29167V27.7083Z"
                     />
                  </g>
               </svg>

               <section>
                  <p>Карточек просмотрено</p>
                  <h4>{user.cardsViewed}</h4>
               </section>
            </li>
            <li>
               <svg width="35" height="35" viewBox="0 0 35 35" xmlns="http://www.w3.org/2000/svg">
                  <g mask="url(#mask0_112_1233)">
                     <path d="M4.95817 26.25L2.9165 24.2083L13.7082 13.3438L19.5415 19.1771L27.1248 11.6667H23.3332V8.75H32.0832V17.5H29.1665V13.7083L19.5415 23.3333L13.7082 17.5L4.95817 26.25Z"
                     />
                  </g>
               </svg>

               <section>
                  <p>Рейтинг</p>
                  <h4>{user.score}</h4>
               </section>
            </li>
            <li>
               <svg width="35" height="35" viewBox="0 0 35 35" xmlns="http://www.w3.org/2000/svg">
                  <g mask="url(#mask0_112_1173)">
                     <path d="M4.375 4.375H16.0417V16.0417H4.375V4.375ZM18.9583 4.375H30.625V16.0417H18.9583V4.375ZM4.375 18.9583H16.0417V30.625H4.375V18.9583ZM23.3333 18.9583H26.25V23.3333H30.625V26.25H26.25V30.625H23.3333V26.25H18.9583V23.3333H23.3333V18.9583ZM21.875 7.29167V13.125H27.7083V7.29167H21.875ZM7.29167 7.29167V13.125H13.125V7.29167H7.29167ZM7.29167 21.875V27.7083H13.125V21.875H7.29167Z"
                     />
                  </g>
               </svg>

               <section>
                  <p>Карточек создано</p>
                  <h4>{user.cardsCreated}</h4>
               </section>
            </li>
            <li>
               <svg width="35" height="35" viewBox="0 0 35 35" xmlns="http://www.w3.org/2000/svg">
                  <g mask="url(#mask0_112_1227)">
                     <path d="M13.125 4.37499V1.45833H21.875V4.37499H13.125ZM16.0417 20.4167H18.9583V11.6667H16.0417V20.4167ZM17.5 32.0833C15.7014 32.0833 14.0061 31.737 12.4141 31.0443C10.822 30.3516 9.43056 29.4097 8.23958 28.2187C7.04861 27.0278 6.10677 25.6363 5.41406 24.0443C4.72135 22.4523 4.375 20.7569 4.375 18.9583C4.375 17.1597 4.72135 15.4644 5.41406 13.8724C6.10677 12.2804 7.04861 10.8889 8.23958 9.69791C9.43056 8.50694 10.822 7.5651 12.4141 6.87239C14.0061 6.17968 15.7014 5.83333 17.5 5.83333C19.0069 5.83333 20.4531 6.07638 21.8385 6.5625C23.224 7.04861 24.5243 7.75347 25.7396 8.67708L27.7813 6.63541L29.8229 8.67708L27.7813 10.7187C28.7049 11.934 29.4097 13.2344 29.8958 14.6198C30.3819 16.0052 30.625 17.4514 30.625 18.9583C30.625 20.7569 30.2786 22.4523 29.5859 24.0443C28.8932 25.6363 27.9514 27.0278 26.7604 28.2187C25.5694 29.4097 24.178 30.3516 22.5859 31.0443C20.9939 31.737 19.2986 32.0833 17.5 32.0833ZM17.5 29.1667C20.3194 29.1667 22.7257 28.1701 24.7188 26.1771C26.7118 24.184 27.7083 21.7778 27.7083 18.9583C27.7083 16.1389 26.7118 13.7326 24.7188 11.7396C22.7257 9.74652 20.3194 8.75 17.5 8.75C14.6806 8.75 12.2743 9.74652 10.2813 11.7396C8.28819 13.7326 7.29167 16.1389 7.29167 18.9583C7.29167 21.7778 8.28819 24.184 10.2813 26.1771C12.2743 28.1701 14.6806 29.1667 17.5 29.1667Z"
                     />
                  </g>
               </svg>

               <section>
                  <p>Часов за учебой</p>
                  <h4>{user.hours}</h4>
               </section>
            </li>
         </ul>
         <div className='account__actions'>
            <Link className='main__btn' to='edit'>Редактровать профиль</Link>
            <button className='delete__btn' to='edit'
               onClick={() => AuthService.logout()}>Выйти</button>
         </div>
      </div>
   )
}
export default WithAuth(Account)
