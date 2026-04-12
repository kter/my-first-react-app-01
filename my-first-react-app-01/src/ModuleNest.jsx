import styles from './ModuleNest.module.css';
import ModuleText from './ModuleText';

export default function ModuleNest() {
  return (
    <div className={styles.panel}>
      <ModuleText />
    </div>
  );
}


