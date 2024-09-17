import styles from './styles.module.scss';
import EntrarModoDownload from '../../../assets/descriptionImgs/EntrarModoDownload.png';
import modoDownload from '../../../assets/descriptionImgs/ModoDownload.png';

export function TutorialA0225M() {
  return (
    <main className={styles.Container} id="A0225M">
      <h1>REMOVENDO CONTA SAMSUNG A22 4G</h1>
      <span>
        Colocar o telefone em modo download, seja pelo aplicativo ou atraves de
        tutorial no Youtube
      </span>
      <div className={styles.imgContainer}>
        <img src={EntrarModoDownload} alt="Modo Download" />
      </div>
      <span>
        Apos isso siga os passos da imagem abaixo, assim conseguirar remover a
        conta com sucesso.
      </span>
      <div className={styles.imgContainer_2}>
        <img src={modoDownload} alt="Modo Download" />
      </div>
    </main>
  );
}
