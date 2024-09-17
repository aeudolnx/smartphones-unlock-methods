import { SpecificationPhone } from '../components/specificationPhone';
import { MenuBar } from '../components/menuBar';
import styles from './styles.module.scss';
import { HowToUnlock } from '../components/howToUnlock';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { TutorialA022M } from '../components/tutorials/A022M';
import { TutorialA0225M } from '../components/tutorials/A0225M';
import { TutorialGinkgo2 } from '../components/tutorials/Ginkgo2';
export interface Detalhes {
  imagemDoSmartphone: string;
  model: string;
  nomeDoCelular: string;
  processador: string;
  binarios: string;
  androids: string;
  downloadMode: string;
  factoryReset: string;
  unlockMethod: string;
  allowBinary: string;
  notAllowBinary: string;
  flashRom: string;
  program: string;
}
export function App() {
  const [dados, setDados] = useState<Detalhes[]>([]);
  const [filter, setFilter] = useState<Detalhes[]>([]);
  const [selectedComponentId, setSelectedComponentId] = useState<string | null>(
    null,
  );
  const url = 'http://localhost:3000/files';
  const renderComponent = () => {
    if (selectedComponentId === null || selectedComponentId.trim() === '') {
      return <HowToUnlock />;
    }
    switch (selectedComponentId) {
      case 'Samsung Galaxy A02':
      case 'A022M':
        return <TutorialA022M />;
      case 'A0225M':
        return <TutorialA0225M />;
      case 'Ginkgo 2':
        return <TutorialGinkgo2 />;
      // Adicione mais casos aqui para outros componentes se necessário
      default:
        return <HowToUnlock />;
    }
  };
  useEffect(() => {
    axios.get(url).then((res) => {
      setDados(res.data);
    });
  }, []);
  return (
    <>
      <MenuBar
        dados={dados}
        setFilter={setFilter}
        setSelectedComponentId={setSelectedComponentId}
      />
      <section className={styles.sectionContainer}>
        <SpecificationPhone filter={filter} />
        {renderComponent()}
      </section>
    </>
  );
}
