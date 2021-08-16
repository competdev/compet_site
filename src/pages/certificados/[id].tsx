import { useRouter } from 'next/router';

export default function CertificadosPagina() {
    const router = useRouter();
    const id = router.query.id;
    return (
      <h1>Pagina de um certificado id:{id}</h1>
    )
  }