import styles from './Loader.module.css'

export default function Loader() {
    return (
      <div className={styles.loaderContainer}>
        <img src="http://portal.ufvjm.edu.br/a-universidade/cursos/grade_curricular_ckan/loading.gif" alt="" />
        <div>Loading..</div>
      </div>
    )}