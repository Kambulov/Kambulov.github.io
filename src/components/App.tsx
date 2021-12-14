import React, {useEffect, useState} from 'react';
import styles from './styles/index.module.scss'
import {useStoreon} from "storeon/react";
import axios from "axios";
import Card from "./Card";

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [flagScroll, setFlagScroll] = useState(true);
  const [flagBtn, setFlagBtn] = useState(false);

  const {dispatch, photoList} = useStoreon('photoList');

  useEffect(() => {
    if (flagScroll && !flagBtn) {
      axios.get(`https://pixabay.com/api/?key=24793980-b8ea96127605884796aef49d3&page=${currentPage}&per_page=10`)
        .then((results) => {
          dispatch('photos/set', results);
      }).finally(() => {
        setFlagScroll(false)
      })
      setCurrentPage(currentPage + 1)
    }
  }, [flagScroll])

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler)
    return () => {
      document.removeEventListener('scroll', scrollHandler)
    }
  }, [])

  const scrollHandler = (e: any) => {
    if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100) {
      setFlagScroll(true)
    }
  }

  const handleClickBtn = () => {
    setFlagBtn(!flagBtn)
  }

  return (
    <div className={styles['container']}>
      <h1 className={styles['container__title']}>Фотоальбом</h1>
      <button
        className={styles['container__btn']}
        onClick={handleClickBtn}>
          {!flagBtn ? 'Понравившиеся публикации' : 'Все публикации'}
      </button>
      <div className={styles['gallery']}>
        {!flagBtn ? photoList.map((item: Record<string, any>) => (
            <Card key={`${item.id}~${item.user}`} data={item}/>
          ))
          :
          photoList.map((item: Record<string, any>) => {
            if (item.liked) return <Card key={`${item.id}~${item.user}`} data={item}/>
          })
        }
      </div>
    </div>
  );
}

export default App;
