import React, {FC, SyntheticEvent} from 'react';
import styles from "./styles/index.module.scss";
import HeartIcon from "../../assets/HeartIcon";
import TrashIcon from "../../assets/TrashIcon";
import {useStoreon} from "storeon/react";
import placeholder from '../../assets/placeholder.png'
interface ICard {
  data: Record<string, any>
}

const Card: FC<ICard> = ({data}) => {
  const {dispatch} = useStoreon();

  const handleClickLike = (id: number) => {
    dispatch('photos/like', id)
  }

  const handleClickDelete = (id: number) => {
    dispatch('photos/delete', id)
  }

  return (
    <div className={styles['card']}>
      <div className={styles['card__user']}>
        <img
          height="50"
          width="50"
          onError={(e) => {
          (e.target as HTMLImageElement).src = placeholder
        }}
          className={styles['card__user-logo']}
          src={data.userImageURL}
        />
        <p className={styles['card__user-name']}>{data.user}</p>
      </div>
      <img className={styles['card__image']} height="400" width="500" src={data.largeImageURL}/>
      <div className={styles['card__info']}>
        <p className={styles['card__user-name']}>{data.user}:<span
          className={styles['card__user-tags']}>{data.tags}</span></p>
        <div className={data.liked ? `${styles['hearth']} ${styles['hearth--like']}` : styles['hearth']}
             onClick={() => handleClickLike(data.id)}>
          <HeartIcon/>
        </div>
        <div className={styles['delete']} onClick={() => handleClickDelete(data.id)}>
          <TrashIcon/>
        </div>
      </div>

    </div>
  );
};

export default Card;