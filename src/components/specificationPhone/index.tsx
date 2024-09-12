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
          <ul key={data.model}>
            <li>
              <img src={data.imagemDoSmartphone} alt={data.model} />
            </li>
            <li>{data.model}</li>
            <li>{data.nomeDoCelular}</li>
            <li>{data.processador}</li>
            <li>{data.binarios}</li>
            <li>{data.androids}</li>
          </ul>
        );
      })}
    </main>
  );
}
