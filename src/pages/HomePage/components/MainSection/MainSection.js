import TopbarSection from './TopbarSection/TopbarSection';
import HeaderSection from './HeaderSection/HeaderSection';
import EditorSection from './EditorSection/EditorSection';

import styles from './MainSection.module.css';
import { useLazyGetPageQuery } from 'slices/pageApiSlice';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAccessToken } from 'slices/tokenSlice';
import { createContext, useEffect, useState } from 'react';
import { selectUserInfo } from 'slices/userSlice';

export const OwnerContext = createContext();
export const FontContext = createContext();
export const PageContext = createContext();

function MainSection(props) {
  const [isOwner, setIsOwner] = useState();
  const [fontName, setFontName] = useState("'Raleway', monospace");

  const navigate = useNavigate();

  const userInfo = useSelector(selectUserInfo);
  const accessToken = useSelector(selectAccessToken);
  const [searchParams] = useSearchParams();
  const pageId = searchParams.get('id');

  const [getPage, { data: pageInfo, isError }] = useLazyGetPageQuery();

  useEffect(() => {
    if (isError) {
      navigate('/404');
    }
  });

  useEffect(() => {
    if (accessToken && pageId) {
      getPage({ accessToken, pageId });
    }
  }, [accessToken, pageId]);

  useEffect(() => {
    if (userInfo && pageInfo && pageInfo?.fontName) {
      setFontName(pageInfo?.fontName);
      if (userInfo?.id === pageInfo?.owner) {
        setIsOwner(true);
      } else {
        setIsOwner(false);
      }
    }
  }, [userInfo, pageInfo]);

  return (
    <OwnerContext.Provider value={isOwner}>
      <FontContext.Provider value={{ fontName, setFontName }}>
        <PageContext.Provider value={pageInfo}>
          <div className={styles.wrapper}>
            <div className={styles.topbarSectionWrapper}>
              <TopbarSection />
            </div>
            <div
              className={styles.mainSectionWrapper}
              style={{ fontFamily: fontName }}
            >
              <div className={styles.headerSectionWrapper}>
                <HeaderSection />
              </div>
              <div className={styles.editorSectionWrapper}>
                <EditorSection />
              </div>
            </div>
          </div>
        </PageContext.Provider>
      </FontContext.Provider>
    </OwnerContext.Provider>
  );
}

export default MainSection;
