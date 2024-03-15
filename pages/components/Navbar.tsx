import Link from "next/link";
import Image from "next/image";
import styles from '../../styles/Navbar.module.css'

export default function Navbar() {
  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.logo}>
          <Image src="/images/logoserie.png" width={550} height={200} alt="logoSerie"/>
        </div>
        <ul className={styles.link_items}>
          <li>
            <Link href="/" legacyBehavior>
            <a>Home</a>
            </Link>
          </li>
          <li>
            <Link href="/about" legacyBehavior>
              <a>Sobre o projeto</a>
            </Link>
          </li>
        </ul>
      </nav>
    </>
  )
}
