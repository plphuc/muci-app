import PageBlock from '../PageBlock/PageBlock';
import styles from './DisplayListFeature.module.css';

function DisplayListFeature(props) {
  const { pages } = props;
  const displayAllPages = pages?.map((page) => {
    return <PageBlock key={page.id} parentClass={styles.navItem} page={page} />;
  });

  return <div className={styles.wrapper}>
    <div className={styles.pageTitleWrapper}>{displayAllPages}</div>
    </div>;
}

export default DisplayListFeature;
