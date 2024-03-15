import Image from "next/image";
import styles from '../styles/About.module.css';

export default function About() {
    return (
        <div className={styles.aboutContainer}>
            <h1>Sobre o projeto</h1>
            <p>
                Bem-vindo ao projeto sobre os personagens de Rick and Morty! Este projeto foi desenvolvido como parte do processo seletivo da DTI Digital. O objetivo foi criar uma aplicação web responsiva utilizando Next.js para listar e exibir informações detalhadas sobre os personagens da famosa série animada Rick and Morty.
                Foi utilizado a API pública do Rick and Morty para obter os dados dos personagens, o que permitiu listar uma variedade de informações, como nome, status de vida, gênero e muito mais.
            </p>
            <div className={styles.logoContainer}>
                <Image src="/images/dtilogo.png" width={300} height={300} alt="DTI Logo" />
            </div>
        </div>
    );
}
