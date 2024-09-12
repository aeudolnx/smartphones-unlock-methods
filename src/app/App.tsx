import { SpecificationPhone } from '../components/specificationPhone';
import { MenuBar } from '../components/menuBar';
import styles from './styles.module.scss';
import { HowToUnlock } from '../components/howToUnlock';
export function App() {
  return (
    <>
      <MenuBar />
      <section className={styles.sectionContainer}>
        <SpecificationPhone />
        <HowToUnlock />
      </section>
    </>
  );
}
