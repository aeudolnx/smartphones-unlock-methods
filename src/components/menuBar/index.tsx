import { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { Detalhes } from '../../app/App';
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

  // const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = e.target.value;
  //   setSearch(value);

  //   const lowerCasedQuery = value.toLowerCase();
  //   const filtered = dados.filter(
  //     (dado) =>
  //       dado.model.toLowerCase().includes(lowerCasedQuery) ||
  //       dado.nomeDoCelular.toLowerCase().includes(lowerCasedQuery),
  //   );
  //   setFilter(filtered);

  //   // Pega o modelo mais próximo ou o primeiro modelo disponível
  //   const selected = filtered.length > 0 ? filtered[0].model : null;
  //   setSelectedComponentId(selected);
  // };

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
    if (search.trim() === '') {
      setFilter([]);
      setSelectedComponentId(null); // Reseta o componente selecionado
    } else {
      const lowerCasedQuery = search.toLocaleLowerCase();
      const filteredData = dados.filter((dado) =>
        dado.nomeDoCelular.toLocaleLowerCase().includes(lowerCasedQuery),
      );
      setFilter(filteredData);

      // Atualiza o componente selecionado com base no modelo encontrado
      if (filteredData.length > 0) {
        setSelectedComponentId(filteredData[0].model); // Exemplo de lógica
      } else {
        setSelectedComponentId(null); // Caso não encontre nada
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
