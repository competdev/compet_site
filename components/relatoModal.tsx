import React from 'react'
import styles from '../styles/RelatoModal.module.css'

function Modal({ closeModal }) {
  return (
    <div className={styles.modalBackground}>
      <div className={styles.modalContainer}>
        <div className={styles.titleContainer}>
          <div className={styles.membroImagem}>
            <img className={styles.foto} src="https://i.ibb.co/3swTqhQ/default-photo.webp" />
          </div>
          <div className={styles.textsModal}>
            <div className={styles.titleName}>
              <h1> Nome do Ex-membro </h1>
            </div>
            <div className={styles.body}>
              <p> Relato do Ex-membro </p>
            </div>
          </div>
          <div className={styles.titleCloseBtn}>
            <button onClick={() => closeModal(false)}> X </button>
          </div>
        </div>

        <div className={styles.infoContainer}>


        </div>

      </div>
    </div>
  )
}

export default Modal