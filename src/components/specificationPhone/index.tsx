import styles from './styles.module.scss';
import Smartphone from '../../assets/imgs/A02-A022M.webp';
export function SpecificationPhone() {
  return (
    <main className={styles.Container}>
      <div className={styles.imgContainer}>
        <img src={Smartphone} alt="A022M" />
      </div>
      <ul>
        <li>Especificações do Celular</li>
        <li>Modelo: A022M</li>
        <li>Processador: MediaTek</li>
        <li>Androids: 10, 11</li>
        <li>Binarios: 1, 2, 3, 4</li>
      </ul>
    </main>
  );
}
