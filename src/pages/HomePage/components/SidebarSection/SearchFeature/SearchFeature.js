import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DisplayFeature from '../DisplayFeature/DisplayFeature';

import styles from './SearchFeature.module.css';
import ModalFeature from '../ModalFeature/ModalFeature';
import { sortListWord } from 'common/utils';
import {
  useGetMetaAllPagesQuery,
  useLazyGetPageQuery,
} from 'slices/pageApiSlice';
import { useSelector } from 'react-redux';
import { selectAccessToken } from 'slices/tokenSlice';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { createSearchParams, useLocation, useNavigate } from 'react-router-dom';

function SearchFeature(props) {
  const { className } = props;
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const accessToken = useSelector(selectAccessToken);
  const { data: allPages } = useGetMetaAllPagesQuery(accessToken, {
    skip: !accessToken,
  });
  const [searchResult, setSearchResult] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();

  const [getPage] = useLazyGetPageQuery();

  const handleSearchPage = (e) => {
    const searchValue = e.target.value.toLowerCase().trim();
    setSearchResult(
      allPages.filter(
        (page) => page.title.toLowerCase().indexOf(searchValue) > -1
      )
    );
  };

  const handleChoosePage = (id) => {
    setIsSearchModalOpen(false);

    getPage({ accessToken, pageId: id })
      .unwrap()
      .then((res) => {
        navigate({
          pathname: location.pathname,
          search: createSearchParams({
            id: `${res.id}`,
          }).toString(),
        });
      });
  };

  const titlePagesList = sortListWord(searchResult, 'title')?.map((page) => {
    return (
      <div
        className={styles.pageItemWrapper}
        key={page.id}
        onClick={() => handleChoosePage(page.id)}
      >
        <div className={styles.iconPageItem}>{page.icon || '📃'}</div>
        <div>{page.title}</div>
      </div>
    );
  });
  
  useEffect(() => {
    if (allPages) {
      setSearchResult(allPages);
    }
  }, [allPages]);

  return (
    <>
      <div className={className} onClick={() => setIsSearchModalOpen(true)}>
        <DisplayFeature
          icon={<FontAwesomeIcon icon={faMagnifyingGlass} />}
          title="Search"
        />
      </div>
      <div
        className={classNames(styles.modalWrapper, {
          [styles.visible]: isSearchModalOpen,
        })}
        onClick={() => setIsSearchModalOpen(false)}
      >
        <ModalFeature>
          <div className={styles.modalChildrenContainer}>
            <div className={styles.searchbarWrapper}>
              <div className={styles.iconContainer}>
                <FontAwesomeIcon icon={faMagnifyingGlass} size="lg" />
              </div>
              <div className={styles.searchInputContainer}>
                <input
                  type="text"
                  placeholder="Search in Notion"
                  onChange={handleSearchPage}
                />
              </div>
            </div>
            <div className={styles.pageListWrapper}>
              <div className={styles.titleContainer}>Page's Name</div>
              <div className={styles.pagesListContainer}>
                {allPages && titlePagesList}
              </div>
            </div>
          </div>
        </ModalFeature>
      </div>
    </>
  );
}

export default SearchFeature;
