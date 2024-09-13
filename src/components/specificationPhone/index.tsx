import styles from './styles.module.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Detalhes } from '../../app/App';
interface PhoneProps {
  filter: Detalhes[];
}
export function SpecificationPhone({ filter }: PhoneProps) {
  return (
    <main className={styles.Container}>
      {filter.length === 0 ? (
        <div className={styles.WelcomeContainer}>
          <h1>Bem-vindo! Para ver os detalhes dos celulares,</h1>
          <h1>digite o modelo desejado na barra de pesquisa.</h1>
          <h1>não se esqueça de incluir todas as informações relevantes.</h1>
        </div>
      ) : (
        filter.map((data) => {
          return (
            <ul className={styles.ulContainer} key={data.model}>
              <div className={styles.imgContainer}>
                <img src={data.imagemDoSmartphone} alt={data.model} />
              </div>
              <li>{data.nomeDoCelular}</li>
              <li>Modelo: {data.model}</li>
              <li>Processador: {data.processador}</li>
              <li>Binarios disponiveis: {data.binarios}</li>
              <li>Androids disponiveis: {data.androids}</li>
              <li>Androids disponiveis: {data.androids}</li>
              <li>Androids disponiveis: {data.androids}</li>
              <li>Androids disponiveis: {data.androids}</li>
              <li>Androids disponiveis: {data.androids}</li>
              <li>Androids disponiveis: {data.androids}</li>
              <li>Androids disponiveis: {data.androids}</li>
              <li>Androids disponiveis: {data.androids}</li>
              <li>Androids disponiveis: {data.androids}</li>
              <li>Androids disponiveis: {data.androids}</li>
              <li>Androids disponiveis: {data.androids}</li>
              <li>Androids disponiveis: {data.androids}</li>
              <li>Androids disponiveis: {data.androids}</li>
              <li>Androids disponiveis: {data.androids}</li>
              <li>Androids disponiveis: {data.androids}</li>
            </ul>
          );
        })
      )}
    </main>
  );
}
