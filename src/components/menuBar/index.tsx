import { useEffect, useState } from 'react';
import { Detalhes } from '../../app/App';
import styles from './styles.module.scss';

interface InputProps {
  dados: Detalhes[];
  setFilter: (filter: Detalhes[]) => void;
  setSelectedComponentId: (id: string | null) => void;
}

export function MenuBar({
  dados,
  setFilter,
  setSelectedComponentId,
}: InputProps) {
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (!search) {
      setFilter([]); // Não exibe nada se a busca estiver vazia
    } else {
      const lowerCasedQuery = search.toLocaleLowerCase();
      const foundItem = dados.find((item) =>
        item.nomeDoCelular.toLocaleLowerCase().includes(lowerCasedQuery),
      );
      if (foundItem) {
        setFilter([foundItem]); // Coloca o primeiro item encontrado no estado
      } else {
        setFilter([]); // Se não houver correspondência, limpa o estado
      }
    }
  }, [search, dados, setFilter]);

  useEffect(() => {
    if (!search) {
      setFilter([]); // Limpa a lista quando o input está vazio
      setSelectedComponentId(null); // Reseta o componente selecionado
    } else {
      const lowerCasedQuery = search.toLocaleLowerCase();

      // Usa find() para pegar o primeiro item que coincida
      const foundItem = dados.find(
        (item) =>
          item.nomeDoCelular.toLocaleLowerCase().includes(lowerCasedQuery) ||
          item.model.toLocaleLowerCase().includes(lowerCasedQuery),
      );

      if (foundItem) {
        setFilter([foundItem]); // Exibe somente o primeiro item encontrado
        setSelectedComponentId(foundItem.model); // Atualiza o componente com base no modelo
      } else {
        setFilter([]); // Se nada for encontrado, limpa o estado de filtro
        setSelectedComponentId(null); // Reseta o componente selecionado
      }
    }
  }, [search, dados, setFilter, setSelectedComponentId]);
  return (
    <main className={styles.Container}>
      <div className={styles.ContainerBar}>
        <input
          type="text"
          name=""
          id=""
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
    </main>
  );
}
