import { createStoreon, StoreonModule } from 'storeon';
import { Events, State } from '../interfaces';

const photoModule: StoreonModule<State, Events> = (store) => {
  store.on('@init', () => ({
    photoList: [],
  }));

  store.on('photos/set',  (state, event) => {
    const array = event.data.hits.map((item:Record<string, any>)=>{
      return {
        ...item,
        liked:false
      }
    })
    return {
      photoList: [...state.photoList!, ...array]
    }
  });

  store.on('photos/like',  (state, event) => {
    const array = state.photoList?.map((item)=>{
      if(item.id == event){
        return {
          ...item,
          liked: !item.liked,
        }
      }
      return item;
    })
    return {
      photoList: array
    }
  });
  store.on('photos/delete',  (state, event) => ({

      photoList: state.photoList?.filter((item)=>item.id !== event)

  }));
};

const store = createStoreon<State, Events>([photoModule]);

export default store;
