import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { testData } from '../testData'
import { EditorCardsService } from '../services/editorCardsService';
import { onError } from './useUser'


const useEditorDeck = (id, searchQuery) => {
   const testDeck = testData.decks[0];
   const { isLoading, data } = useQuery(
      ['editor-deck', id, searchQuery],
      async () => await EditorCardsService.getCards(id, searchQuery),
      {
         onError,
         initialData: {
            deckName: testDeck.deckName,
            cards: testDeck.cards.filter(card =>
               card.frontSide.toLowerCase().includes(searchQuery.toLowerCase()))
         }
      },
   );

   return { isLoading, data }
};

const useCreateCard = (setOpened) => {
   const queryClient = useQueryClient();

   const { isLoading, mutateAsync: createCard } = useMutation(
      async (data) => await EditorCardsService.createCard(data),
      {
         onSuccess: cardId => {
            queryClient.invalidateQueries('editor-deck');
            setOpened(false)
            return cardId;
         },
         onError
      }
   );

   return { isLoading, createCard };
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
         onError
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
         onError
      }
   );

   return { isLoading, deleteCard };
};

const useImage = () => {
   const queryClient = useQueryClient();

   const { isLoading, mutate: addImage } = useMutation(
      async (data) => await EditorCardsService.addImage(data),
      {
         onSuccess: () => queryClient.invalidateQueries('editor-deck'),
         onError
      }
   );

   return { isLoading, addImage };
};

const useImageDelete = () => {
   const queryClient = useQueryClient();

   const { isLoading, mutate: deleteImage } = useMutation(
      async (data) => await EditorCardsService.deleteImage(data),
      {
         onSuccess: () => queryClient.invalidateQueries('editor-deck'),
         onError
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