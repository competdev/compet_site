import Link from "next/link";
import Image from "next/image";
import styles from "./InterpetMention.module.css";
import { IMAGE_ASSETS } from "../../../util/imageAssets";

export default function InterpetMention() {
  return (
    <section className={styles.mention} aria-label="InterPET">
      <div className={styles.inner}>
        <div className={styles.logoWrap}>
          <Image
            src={IMAGE_ASSETS.logoInterpet}
            alt="Logo InterPET"
            width={220}
            height={220}
            className={styles.logo}
            sizes="220px"
          />
        </div>

        <div className={styles.content}>
          <p className={styles.eyebrow}>Evento do CEFET-MG desde 2016</p>
          <h2 className={styles.title}>InterPET</h2>
          <p className={styles.subtitle}>
            Encontro de Programas de Educação Tutorial do CEFET-MG
          </p>
          <p className={styles.text}>
            O InterPET reúne os grupos PET para discutir e propor melhorias,
            promover intercâmbio de conhecimento entre os campus e fortalecer a
            formação acadêmica dos petianos.
          </p>
          <Link href="/interpet" className={styles.link}>
            Conheça o InterPET
          </Link>
        </div>
      </div>
    </section>
  );
}
