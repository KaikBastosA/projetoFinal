import { useEffect, useState } from "react";
import axios from "axios";
import PijamaCard from "../../components/cardPajama";
import styles from "./styles.module.css";
import lupaIcon from "../../assets/lupa.svg";

interface Pijama {
  id: string;
  name: string;
  gender: string;
  type: string;
  season: string;
  description: string;
  image: string;
  price: number;
  favorite: boolean;
  on_sale: boolean;
  sale_percent: number;
}

export default function PajamasPage() {
  const [pijamas, setPijamas] = useState<Pijama[]>([]);
  const [filteredPijamas, setFilteredPijamas] = useState<Pijama[]>([]);
  const [search, setSearch] = useState("");
  const [gender, setGender] = useState("Todos");
  const [type, setType] = useState("Todos");
  const [season, setSeason] = useState("Todos");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    axios.get("http://localhost:3333/all-pajamas").then((response) => {
      setPijamas(response.data as Pijama[]);
      setFilteredPijamas(response.data as Pijama[]);
    });
  }, []);

  useEffect(() => {
    let filtered = pijamas.filter((pijama) =>
      pijama.name.toLowerCase().includes(search.toLowerCase())
    );

    if (gender !== "Todos") {
      filtered = filtered.filter((pijama) => pijama.gender === gender);
    }
    if (type !== "Todos") {
      filtered = filtered.filter((pijama) => pijama.type === type);
    }
    if (season !== "Todos") {
      filtered = filtered.filter((pijama) => pijama.season === season);
    }

    setFilteredPijamas(filtered);
    setCurrentPage(1);
  }, [search, gender, type, season, pijamas]);

  const toggleFavorite = (id: string) => {
    setPijamas((prevPijamas) =>
      prevPijamas.map((pijama) =>
        pijama.id === id ? { ...pijama, favorite: !pijama.favorite } : pijama
      )
    );
    
    axios
      .patch(`http://localhost:3333/pajamas/${id}/favorite`)
      .catch((error) => console.error("Erro ao favoritar pijama:", error));
  };

  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentItems = filteredPijamas.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(filteredPijamas.length / itemsPerPage);

  return (
    <div className={styles.container}>
      <div className={styles.searchBar}>
        <input
          type="text"
          placeholder="Pesquisar..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <img src={lupaIcon} alt="Buscar" className={styles.searchIcon} />
      </div>

      <div className={styles.filters}>
        <select onChange={(e) => setGender(e.target.value)}>
          <option>Todos</option>
          <option>Unissex</option>
          <option>Masculino</option>
          <option>Feminino</option>
          <option>Família</option>
        </select>
        <select onChange={(e) => setType(e.target.value)}>
          <option>Todos</option>
          <option>Adulto</option>
          <option>Infantil</option>
        </select>
        <select onChange={(e) => setSeason(e.target.value)}>
          <option>Todos</option>
          <option>Verão</option>
          <option>Inverno</option>
        </select>
      </div>

      <div className={styles.grid}>
        {currentItems.map((pijama) => (
          <PijamaCard key={pijama.id} pijama={pijama} onToggleFavorite={toggleFavorite} />
        ))}
      </div>

      <div className={styles.pagination}>
        <button disabled={currentPage === 1} onClick={() => setCurrentPage((prev) => prev - 1)}>
          &lt;
        </button>
        <span>
          {currentPage} / {totalPages}
        </span>
        <button disabled={currentPage === totalPages} onClick={() => setCurrentPage((prev) => prev + 1)}>
          &gt;
        </button>
      </div>
    </div>
  );
}
