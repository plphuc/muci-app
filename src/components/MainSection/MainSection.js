import EditorSection from './EditorSection/EditorSection';
import HeaderSection from './HeaderSection/HeaderSection';
import styles from './MainSection.module.css';

function MainSection(props) {
  return <div className={styles.wrapper}>
    <HeaderSection />
    <EditorSection />
  </div>;
}

export default MainSection;
