import { useSelector } from 'react-redux';

import TopbarSection from './TopbarSection/TopbarSection';
import HeaderSection from './HeaderSection/HeaderSection';
import EditorSection from './EditorSection/EditorSection';

import { useSavePageMutation } from 'slices/pageSlice';
import { selectAccessToken } from 'slices/tokenSlice';
import { useGetUserQuery } from 'slices/userSlice';

import styles from './MainSection.module.css';

function MainSection(props) {
  const [savePage] = useSavePageMutation();
  const accessToken = useSelector(selectAccessToken);
  const { data: userInfo } = useGetUserQuery(accessToken);

  // useEffect(() => {
  //   const saveData = async () => {
  //     try {
  //       const content = await ejInstance.current?.save();
  //       await savePage({content, accessToken, userId: userInfo.id})
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   const intervalId = setInterval(async () => {
  //     console.log(userInfo);
  //       if (accessToken) {
  //       saveData();
  //     }
  //     }, 30000);
  //   return () => clearInterval(intervalId);
  // }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.topbarSectionWrapper}>
        <TopbarSection />
      </div>
      <div className={styles.mainSectionWrapper}>
        <div className={styles.headerSectionWrapper}>
          <HeaderSection />
        </div>
        <div className={styles.editorSectionWrapper}><EditorSection /></div>
      </div>
    </div>
  );
}

export default MainSection;
