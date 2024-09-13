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
              <li className={styles.process}>
                Processador: {data.processador}
              </li>
              <li>Binários disponiveis: {data.binarios}</li>
              <li>Androids disponiveis: {data.androids}</li>
              <li className={styles.methods}>
                Modo Download (Desligado): Pressione Vol + e -, Insira Cabo USB
              </li>
              <li className={styles.methods}>
                Formatação de fábrica (Desligado): Pressione Vol + e o botão de
                Ligar, solte o botão de Ligar e pressione-o novamente quando
                aparecer Samsung na tela.
              </li>
              <li>
                Consultar IMEI:{' '}
                <a
                  href="https://www.consultaaparelhoimpedido.com.br/public-web/home?cid=590675"
                  target="_blank"
                  rel="noreferrer"
                >
                  https://www.consultaaparelhoimpedido.com.br/public-web/home?cid=590675
                </a>
              </li>
              <li className={styles.download}>
                Métodos de remoção: Modo Download
              </li>
              <li>Binários removíveis: Todos</li>
              <li>Binários não removíveis: Nenhum</li>
              <li>Precisa diminuir rom: não</li>
              <li>Programa para remover conta: UnlockTool</li>
              <li>Programa para remover conta: UnlockTool</li>
              <li>Programa para remover conta: UnlockTool</li>
            </ul>
          );
        })
      )}
    </main>
  );
}
