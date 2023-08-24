import styles from "./NotFound.module.css";

const NotFound = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Erro: 404</h1>
      <p>Página não encontrada</p>
    </div>
  );
};

export default NotFound;
