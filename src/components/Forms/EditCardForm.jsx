import React, { useState } from 'react';
import { clickOutsideHandler, stopPropagation } from '../../util';
import { useContext } from 'react';
import { FormsContext } from '../../providers/FormsProvider';
import { useForm } from 'react-hook-form';
import { useDeleteCard, useEditCard } from '../../hooks/useEditorDeck';

export default function EditCardForm() {
   const { setEditCardFormOpened, selectedCard, setCardSelected } = useContext(FormsContext);
   const { register, formState: { errors, }, handleSubmit, watch } = useForm({
      defaultValues: {
         frontSide: selectedCard?.frontSide,
         backSide: selectedCard?.backSide
      }
   });
   const { isLoading, editCard } = useEditCard(setEditCardFormOpened);
   const { isLoading: isLoading2, deleteCard } = useDeleteCard(setEditCardFormOpened);
   const [side, setSide] = useState(true);
   const [hasFrontImage, setFrontImage] = useState(false);
   const [hasBackImage, setBackImage] = useState(false);

   const onSubmit = (data) => editCard(data);

   const onDelete = () => deleteCard(selectedCard.id);


   return (
      <div className='modal'
         onClick={e => clickOutsideHandler(e, '.modal__wrapper',
            setEditCardFormOpened, () => setCardSelected(null))
         }>
         <div className='modal__wrapper card__modal'>
            <div>
               <h3>Редактировать карточку</h3>
               <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
                  <label>
                     <textarea placeholder='Лицевая сторона'
                        className={errors?.frontSide ? 'invalid' : ''}
                        {...register('frontSide', { required: 'Обязательноe поле.' })} />
                     {errors?.frontSide && <p className='error'>{errors?.frontSide.message}</p>}
                  </label>
                  {hasFrontImage
                     ? <input type="file" className='file'{...register('image-1')} />
                     : <button type='button' onClick={() => setFrontImage(true)} className='add__image__btn'>
                        Добавить изображение
                     </button>
                  }
                  <label>
                     <textarea placeholder='Обратная сторона'
                        className={errors?.backSide ? 'invalid' : ''}
                        {...register('backSide', { required: 'Обязательноe поле.' })} />
                     {errors?.backSide && <p className='error'>{errors?.backSide.message}</p>}
                  </label>
                  {hasBackImage
                     ? <input type="file" className='file'{...register('image-2')} />
                     : <button type='button' onClick={() => setBackImage(true)} className='add__image__btn'>
                        Добавить изображение
                     </button>
                  }
                  <div className='modal__buttons'>
                     <button type='submit' className='modal_submit'
                        disabled={isLoading}>
                        Сохранить
                     </button>

                     <button type='button' className='modal_submit delete'
                        disabled={isLoading2}
                        onClick={onDelete}>
                        Удалить
                     </button>
                  </div>
               </form>
            </div>
            <div>
               <button className='card training__card'
                  onClick={(e) => {
                     setSide(!side);
                     e.target.classList.toggle('flipped')
                  }}>
                  <p className='card__text' onClick={stopPropagation}>
                     {watch(side ? 'frontSide' : 'backSide')}
                  </p>
               </button>
            </div>
         </div>
      </div>
   )
}
