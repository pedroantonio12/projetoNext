import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface CharacterData {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  image: string;
  location: {
    name: string;
  };
  origin: {
    name: string;
  };
}

const CharacterPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [characterData, setCharacterData] = useState<CharacterData | null>(null);

  useEffect(() => {
    const fetchCharacterData = async () => {
      if (!id || typeof id !== 'string') return;

      try {
        const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
        const data: CharacterData = await res.json();
        setCharacterData(data);
      } catch (error) {
        console.error('Error fetching character data:', error);
      }
    };

    fetchCharacterData();
  }, [id]);

  if (!characterData) {
    return <p>Carregando...</p>;
  }

  const { name, status, species, image, gender, location, origin } = characterData;

  return (
    <div className="container">
      <div className="card">
        <h1>{name}</h1>
        <img src={image} alt={`${name} thumbnail`} />
        <p>Status de vida: {status}</p>
        <p>Espécie: {species}</p>
        <p>Gênero: {gender}</p>
        <p>Localidade: {location.name}</p>
        <p>Origem: {origin.name}</p>
      </div>
      <style jsx>{`
        .container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
        }

        .card {
          background-color: #ffffff;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          text-align: center;
        }

        img {
          width: 200px;
          border-radius: 50%;
          margin-bottom: 20px;
        }

        p {
          margin-bottom: 10px;
        }
      `}</style>
    </div>
  );
};

export default CharacterPage;
