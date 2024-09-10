import styles from './styles.module.scss';
import Smartphone from '../../assets/imgs/A02-A022M.webp';
export function SpecificationPhone() {
  return (
    <main className={styles.Container}>
      <div className={styles.imgContainer}>
        <img src={Smartphone} alt="A022M" />
      </div>
      <p>Especificacoes do Celular</p>
    </main>
  );
}
