import TopbarSection from './TopbarSection/TopbarSection';
import HeaderSection from './HeaderSection/HeaderSection';
import EditorSection from './EditorSection/EditorSection';

import styles from './MainSection.module.css';
import { useLazyGetPageQuery } from 'slices/pageApiSlice';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAccessToken } from 'slices/tokenSlice';
import { createContext, useEffect, useState } from 'react';
import { selectUserInfo } from 'slices/userSlice';
import NotFoundPage from 'pages/NotFoundPage/NotFoundPage';

export const OwnerContext = createContext();
export const FontContext = createContext();
export const PageContext = createContext();

function MainSection(props) {
  const [isOwner, setIsOwner] = useState();
  const [fontName, setFontName] = useState("'Raleway', monospace");

  const navigate = useNavigate();
  const location = useLocation();

  const userInfo = useSelector(selectUserInfo);
  const accessToken = useSelector(selectAccessToken);
  const [searchParams] = useSearchParams();
  const pageId = searchParams.get('id');

  const [getPage, { data: pageInfo, isError }] = useLazyGetPageQuery();

  useEffect(() => {
    if (accessToken && pageId) {
      getPage({ accessToken, pageId });
    }
  }, [accessToken, pageId, getPage]);

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

  if (isError) {
    return <NotFoundPage />;
  }
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
