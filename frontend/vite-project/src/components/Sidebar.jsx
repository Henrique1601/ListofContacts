import * as React from 'react';
import { Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import  styles from "./Sidebar.module.css"


import { LiquidButton } from '@/components/animate-ui/buttons/liquid';
import {BellRing} from '@/components/animate-ui/icons/bell-ring'
import { X } from 'lucide-react'; // Ícone para fechar


export default function Sidebar({ isOpen, toggleSidebar }) {

 const [contacts, setContacts] = useState([]);
 const [search, setSearch] = useState("");
  // const [error, setError] = useState(''); // Removido pois não estava sendo usado
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/Contacts", {
          params: { search: search }, // Envia o parâmetro de busca para o backend
        });
        setContacts(response.data);
        console.log("Resposta da API:", response.data);
      } catch (err) {
        console.log("Erro ao buscar os contatos", err);
      }
    };
    fetchContacts();
  }, [search]); // O useEffect agora depende apenas do estado 'search'
  return (
    <div className= "">
      {/* Adiciona a classe 'open' condicionalmente */}
      <section className={`${styles.ContainerFilter} rounded-r-lg ${isOpen ? styles.open : ''}`}>
        <aside className={styles.Filters}>
          <header className={styles.sidebarHeader}>
            <figure></figure>
            <h1 className="italic text-blue-700 ">Home</h1>
            {/* Botão para fechar a sidebar em telas pequenas */}
            <button onClick={toggleSidebar} className={styles.closeBtn}><X size={24} /></button>
            <BellRing animateOnHover />
          </header>
           <input
              type="text"
              placeholder="Pesquisar por nome, email ou telefone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button>Todas as Pessoas</button>
            <button>Todos  </button>
            <button>Favoritos</button>
            <select name="" id="">
              <option value="">Todos</option>
              <option value="">Familia</option>
              <option value="">Amigos</option>
              <option value="">Devs</option>
              <option value="">Gaming</option>
              <option value="">Outros</option>
            </select>
            <LiquidButton>Adicionar contatos</LiquidButton>
        </aside>
      </section>
      {/* Overlay que aparece quando a sidebar está aberta em telas pequenas */}
      {isOpen && <div className={styles.sidebarOverlay} onClick={toggleSidebar}></div>}
    </div>
  );
};
