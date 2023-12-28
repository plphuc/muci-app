import TopbarSection from './TopbarSection/TopbarSection';
import HeaderSection from './HeaderSection/HeaderSection';
import EditorSection from './EditorSection/EditorSection';

import styles from './MainSection.module.css';

function MainSection(props) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.topbarSectionWrapper}>
        <TopbarSection />
      </div>
      <div className={styles.mainSectionWrapper}>
        <div className={styles.headerSectionWrapper}>
          <HeaderSection />
        </div>
        <div className={styles.editorSectionWrapper}>
          <EditorSection />
        </div>
      </div>
    </div>
  );
}

export default MainSection;
