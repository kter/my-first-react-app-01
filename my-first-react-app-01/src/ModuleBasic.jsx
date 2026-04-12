import styles from './ModuleBasic.module.css';

export default function ModuleBasic() {
  return (
    <>
      <div className={styles.panel}>
        <b>React</b> is JavaScript Library for develop frontend.
      </div>
      <div className={styles.shadowPanel}>
        <b>React</b> is JavaScript Library for develop frontend.
      </div>
    </>
  );
}
