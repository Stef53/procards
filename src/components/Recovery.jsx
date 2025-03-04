import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useNewPassword, useRecovery } from '../hooks/useAuth';

export default function Recovery() {
   const [isEmailSent, setEmailSent] = useState(false);
   const [isCodeSent, setCodeSent] = useState(false);
   const { register, formState: { errors, }, handleSubmit, watch } = useForm({ mode: 'onBlur' });
   const { isLoading, recovery } = useRecovery();
   const { isLoading1, setNewPassword } = useNewPassword();

   const onSubmit = data => {
      if (isCodeSent) {
         delete data.сpassword;
         setNewPassword(data);
         return;
      }

      if (isEmailSent) {
         recovery({ data, isEmailSent });
         setCodeSent(true);
      } else {
         recovery({ data, isEmailSent });
         setEmailSent(true);
      }

   }

   return (
      <div className='signin'>
         <form onSubmit={handleSubmit(onSubmit)}>
            <h1>Восстановление доступа</h1>
            <h2>Введите адрес электронной почты, связанный с вашей учетной записью и мы вышлем вам код для смены пароля.</h2>
            <label>
               Электронная почта
               <input type="email" disabled={isEmailSent}
                  className={errors?.email ? 'invalid' : ''}
                  {...register('email', {
                     required: 'Обязательноe поле.',
                     maxLength: {
                      value: 100,
                      message: 'Максимальная длинна 100 символов'
                    }
                  })} />
               {errors?.email && <p className='error'>{errors?.email.message}</p>}
            </label>
            <label>
               Код из письма
               <input type="tel" disabled={isCodeSent} autoComplete='off'
                  className={errors?.code ? 'invalid' : ''}
                  {...register('code', {
                     required: 'Обязательноe поле.',
                     minLength:{
                      value: 6,
                      message: 'Длина кода должна быть 6 символов'
                     },
                     maxLength:{
                      value: 6,
                      message: 'Длина кода должна быть 6 символов'
                     },
                     disabled: !isEmailSent,
                  })} />
               {errors?.code && <p className='error'>{errors?.code.message}</p>}
            </label>
            <label>
               Новый пароль
               <input type="password"
                  className={errors?.password ? 'invalid' : ''}
                  {...register('password', {
                     required: 'Обязательноe поле.',
                     pattern: {
                      value: /^(?=^.{8,40}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-ZА-Я])(?=.*[a-zа-я]).*$/,
                      message: 'Минимум 8 символов, максимум 40. Одна цифра, заглавная и строчная буквы.'
                    },
                     disabled: !isCodeSent
                  })} />
               {errors?.password && <p className='error'>{errors?.password.message}</p>}
            </label>
            <label>
               Подтвердите новый пароль
               <input type="password"
                  className={errors?.сpassword ? 'invalid' : ''}
                  {...register('сpassword', {
                     required: 'Обязательноe поле.',
                     disabled: !isCodeSent,
                     validate: (value) => {
                        return watch('password') === value || "Пароли не совпадают.";
                     }
                  })} />
               {errors?.сpassword && <p className='error'>{errors?.сpassword.message}</p>}
            </label>
            <button className='modal_submit main__btn' disabled={isLoading || isLoading1}>Отправить</button>
         </form>
      </div>
   )
}
