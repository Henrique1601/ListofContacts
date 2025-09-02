/* 

export const Contatos = ({ search, render = "full" }) => {
  const contactsRef = useRef();
  const smoother = useRef();
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:3000/api/Contacts", {
          params: { search },
        });
        setContacts(response.data);
        console.log("Resposta da API:", response.data);
        setLoading(false);
      } catch (err) {
        console.error("Erro ao buscar os contatos:", err);
        setError("Failed to fetch contacts");
        setLoading(false);
      }
    };
    fetchContacts();
  }, [search]);

  if (render === "filters") {
    return (
      <section className={styles.MainSection}>
        <header className="HeaderContatos">
          <p>Total de contatos</p>
          <h1 className={styles.pageTitle}>Contatos</h1>
          <HighlightText text="Contatos" />
        </header>
        <nav className={styles.nav}>
          <div className={styles.Filter}>
            <ul>
              <li></li>
              <li>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Filtrar por..."
                />
              </li>
              <li>
                <select>
                  <option value="">A-Z</option>
                  <option value="">Z-A</option>
                </select>
              </li>
            </ul>
          </div>
          <div className={styles.ModeSee}>
            <ul>
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </div>
        </nav>
      </section>
    );
  }

  if (render === "results") {
    return (
      <div ref={contactsRef} className={styles.ContactsContainer}>
        <div className="smooth-wrapper-contatos">
          <div className="smooth-content-contatos">
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {contacts.length > 0 ? (
              contacts.map((contact) => (
                <section className={styles.MainContact} key={contact._id}>
                  <div>
                    <h1>{contact.Nome}</h1>
                    <p>{contact.Telefone}</p>
                    <p>{contact.Email}</p>
                    <p>{contact.WhatsApp}</p>
                  </div>
                </section>
              ))
            ) : (
              <p>No contacts found</p>
            )}
            <div className="fim"></div>
          </div>
        </div>
      </div>
    );
  }

  // Renderização completa (padrão)
  return (
    <div ref={contactsRef} className={styles.ContactsContainer}>
      <section className={styles.MainSection}>
        <header className="HeaderContatos">
          <p>Total de contatos</p>
          <h1 className={styles.pageTitle}>Contatos</h1>
          <HighlightText text="Contatos" />
          <button className="button" onClick={scrollToEnd}>
            Ir para o fim
          </button>
        </header>

        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        <section>
          <div>
            <nav className={styles.nav}>
              <div className={styles.Filter}>
                <ul>
                  <li></li>
                  <li>
                    <input
                      type="text"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Filtrar por..."
                    />
                  </li>
                  <li>
                    <select>
                      <option value="">A-Z</option>
                      <option value="">Z-A</option>
                    </select>
                  </li>
                </ul>
              </div>
              <div className={styles.ModeSee}>
                <ul>
                  <li></li>
                  <li></li>
                  <li></li>
                </ul>
              </div>
            </nav>
          </div>
        </section>

        <div className="smooth-wrapper-contatos">
          <div className="smooth-content-contatos">
            {contacts.length > 0 ? (
              contacts.map((contact) => (
                <section className={styles.MainContact} key={contact._id}>
                  <div>
                    <h1>{contact.Nome}</h1>
                    <p>{contact.Telefone}</p>
                    <p>{contact.Email}</p>
                    <p>{contact.WhatsApp}</p>
                  </div>
                </section>
              ))
            ) : (
              <p>No contacts found</p>
            )}
            <div className="fim"></div>
          </div>
        </div>
      </section>
    </div>
  );
}; */