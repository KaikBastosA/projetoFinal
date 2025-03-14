import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
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

  const [searchParams] = useSearchParams();

  useEffect(() => {
    axios.get("http://localhost:3333/all-pajamas").then((response) => {
      setPijamas(response.data as Pijama[]);
      setFilteredPijamas(response.data as Pijama[]);
    });
  }, []);

  useEffect(() => {
    const genderParam = searchParams.get("gender");
    const typeParam = searchParams.get("type");
    if (genderParam) {
      setGender(genderParam);
    } else {
      setGender("Todos");
    }

    if (typeParam) {
      setType(typeParam);
    } else {
      setType("Todos");
    }
  }, [searchParams]);

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
      <div className={styles.blueContainer}>
        <div className={styles.searchBar}>
          <input
            type="text"
            placeholder="Pesquise pelo produto..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <img src={lupaIcon} alt="Buscar" className={styles.searchIcon} />
        </div>
        {/* Filtros */}
        <div className={styles.filters}>
          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option>Todos</option>
            <option>Unissex</option>
            <option>Masculino</option>
            <option>Feminino</option>
            <option>Família</option>
          </select>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option>Todos</option>
            <option>Adulto</option>
            <option>Infantil</option>
          </select>
          <select value={season} onChange={(e) => setSeason(e.target.value)}>
            <option>Todos</option>
            <option>Verão</option>
            <option>Inverno</option>
          </select>
        </div>
      </div>
      {/* Grid de cards */}
      <div className={styles.grid}>
        {currentItems.map((pijama) => (
          <PijamaCard key={pijama.id} pijama={pijama} onToggleFavorite={toggleFavorite} />
        ))}
      </div>
      <div className={styles.pagination}>
        {/* Botão para página anterior */}
        <button
          className={styles.arrowButton}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          &lt;
        </button>
        {/* Páginas numeradas */}
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => {
          if (
            page === 1 ||
            page === totalPages ||
            page === currentPage ||
            Math.abs(page - currentPage) === 1
          ) {
            return (
              <button
                key={page}
                className={`${styles.pageButton} ${page === currentPage ? styles.activePage : ""
                  }`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            );
          } else if (
            (page === currentPage - 2 && page !== 1) ||
            (page === currentPage + 2 && page !== totalPages)
          ) {
            return <span key={page} className={styles.ellipsis}>...</span>;
          }
          return null;
        })}
        {/* Botão para próxima página */}
        <button
          className={styles.arrowButton}
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          &gt;
        </button>
      </div>
    </div>
  );
}