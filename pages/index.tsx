import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

const defaultEndpoint = `https://rickandmortyapi.com/api/character/`;

interface CharacterData {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  image: string;
}

export async function getServerSideProps() {
  const res = await fetch(defaultEndpoint);
  const data: CharacterData = await res.json();
  return {
    props: {
      data
    }
  }
}

export default function Home({ data }: { data: any }) {
  const { info, results: defaultResults = [] } = data;
  const [results, updateResults] = useState(defaultResults);
  const [page, updatePage] = useState({
    ...info,
    current: defaultEndpoint
  });
  const { current }: any = page;

  useEffect(() => {
    if (current === defaultEndpoint) return;

    async function request() {
      const res = await fetch(current);
      const nextData: any = await res.json();

      updatePage({
        current,
        ...nextData.info
      });

      if (!nextData.info?.prev) {
        updateResults(nextData.results);
        return;
      }

      updateResults((prev: any) => {
        return [
          ...prev,
          ...nextData.results
        ]
      });
    }

    request();
  }, [current]);

  function handleLoadMore() {
    updatePage((prev: any) => {
      return {
        ...prev,
        current: page?.next
      }
    });
  }

  function handleOnSubmitSearch(e: any) {
    e.preventDefault();

    const { currentTarget = {} } = e;
    const fields = Array.from(currentTarget?.elements);
    const fieldQuery = fields.find((field: any) => field.name === 'query') as HTMLInputElement;

    const value = fieldQuery.value || '';
    const endpoint = `https://rickandmortyapi.com/api/character/?name=${value}`;

    updatePage({
      current: endpoint
    });
  }

  return (
    <div className="container">
      <Head>
        <title>Character Wiki</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      

      <main>
        <form className="search" onSubmit={handleOnSubmitSearch}>
          <input name="query" type="search" placeholder="Buscar personagem" />
          <button>Search</button>
        </form>

        <div className="grid">
          {results.map((result: CharacterData) => {
            const { id, name, image } = result;
            return (
              <div key={id} className="card">
                <Link href="/character/[id]" as={`/character/${id}`}>
                  <div className="cardContent">
                    <img src={image} alt={`${name} Thumbnail`} />
                    <h3>{name}</h3>
                  </div>
                </Link>
                <div className="buttonContainer">
                  <Link href="/character/[id]" as={`/character/${id}`}>
                    <button className="moreButton">Veja mais sobre</button>
                  </Link>
                </div>
              </div>
            )
          })}
        </div>

        <div className="loadMoreButton">
          <button onClick={handleLoadMore}>Carregar mais</button>
        </div>
      </main>

      <style jsx>{`
        .container {
          background-color: #ffffff;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        main {
          padding: 20px;
          width: 100%;
          max-width: 1200px;
        }

        .search {
          text-align: center;
          margin-bottom: 20px;
        }

        input[type='search'] {
          padding: 10px;
          border: none;
          border-radius: 5px;
          box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
          width: 60%;
          max-width: 400px;
          margin-right: 10px;
          font-size: 1rem;
        }

        button {
          background-color: #3cb371;
          color: #ffffff;
          padding: 10px 20px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-size: 1rem;
          transition: background-color 0.3s ease;
        }

        button:hover {
          background-color: #2e8b57;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 20px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .card {
          overflow: hidden;
          transition: transform 0.3s ease;
          background-color: #ffffff;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          border-radius: 10px;
          padding: 20px;
          text-align: center;
        }

        .card:hover {
          transform: translateY(-5px);
        }

        .cardContent {
          padding: 20px;
        }

        .card img {
          width: 100%;
          border-radius: 5px;
        }

        .card h3 {
          margin: 0;
          font-size: 1.2rem;
          color: #000000;
          font-weight: bold;
          text-transform: capitalize;
          text-align: center;
          margin-top: 10px;
        }

        .buttonContainer {
          text-align: center;
          margin-top: 10px;
        }

        .moreButton {
          background-color: #add8e6;
          color: #ffffff;
          padding: 8px 16px;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-size: 1rem;
          transition: background-color 0.3s ease;
        }

        .moreButton:hover {
          background-color: #87ceeb;
        }

        .loadMoreButton {
          text-align: center;
          margin-top: 20px;
        }
      `}</style>
    </div>
  )
}
