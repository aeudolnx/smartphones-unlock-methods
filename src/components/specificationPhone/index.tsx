import styles from './styles.module.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface Detalhes {
  imagemDoSmartphone: string;
  model: string;
  nomeDoCelular: string;
  processador: string;
  binarios: string;
  androids: string;
}

export function SpecificationPhone() {
  const [dados, setDados] = useState<Detalhes[]>([]);
  const url = 'http://localhost:3000/files';

  useEffect(() => {
    axios.get(url).then((res) => {
      setDados(res.data);
    });
  }, []);

  return (
    <main className={styles.Container}>
      {dados.map((data) => {
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
          </ul>
        );
      })}
    </main>
  );
}
