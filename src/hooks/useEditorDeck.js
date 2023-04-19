import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { testData } from '../testData'
import { EditorCardsService } from '../services/editorCardsService';
import { notifyError } from '../util';


const useEditorDeck = (id, searchQuery) => {
   const testDeck = testData.decks[0];
   const { isLoading, data } = useQuery(
      ['editor-deck', id, searchQuery],
      async () => await EditorCardsService.getCards(id, searchQuery),
      {
         onError: notifyError,
         initialData: {
            deckName: testDeck.deckName,
            cards: testDeck.cards.filter(card =>
               card.frontSide.toLowerCase().includes(searchQuery.toLowerCase()))
         }
      },
   );

   return { isLoading, data }
};

const useCreateCard = (reset, setOpened) => {
   const queryClient = useQueryClient();

   const { isLoading, mutate: createCard, data } = useMutation(
      async (data) => await EditorCardsService.createCard(data),
      {
         onSuccess: () => {
            queryClient.invalidateQueries('editor-deck');
            setOpened(false)
            reset();
         },
         onError: notifyError
      }
   );

   return { isLoading, createCard, data };
};

const useEditCard = (setOpened) => {
   const queryClient = useQueryClient();

   const { isLoading, mutate: editCard } = useMutation(
      async (data) => await EditorCardsService.editCard(data),
      {
         onSuccess: () => {
            queryClient.invalidateQueries('editor-deck');
            setOpened(false)
         },
         onError: notifyError
      }
   );

   return { isLoading, editCard };
};

const useDeleteCard = (setOpened) => {
   const queryClient = useQueryClient();

   const { isLoading, mutate: deleteCard } = useMutation(
      async (data) => await EditorCardsService.deleteCard(data),
      {
         onSuccess: () => {
            queryClient.invalidateQueries('editor-deck');
            setOpened(false);
         },
         onError: notifyError
      }
   );

   return { isLoading, deleteCard };
};

const useImage = () => {
   const { isLoading, mutate: addImage } = useMutation(
      async (data) => await EditorCardsService.addImage(data),
      {
         onError: notifyError,
      }
   );

   return { isLoading, addImage };
};

const useImageDelete = () => {
   const { isLoading, mutate: deleteImage } = useMutation(
      async (data) => await EditorCardsService.deleteImage(data),
      {
         onError: notifyError,
      }
   );

   return { isLoading, deleteImage };
};

export {
   useEditorDeck,
   useCreateCard,
   useEditCard,
   useDeleteCard,
   useImage,
   useImageDelete
};