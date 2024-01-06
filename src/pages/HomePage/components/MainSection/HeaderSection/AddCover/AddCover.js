import classNames from 'classnames';
import styles from './AddCover.module.css';
import { useSaveCoverMutation } from 'slices/coverSlice';
import { useSelector } from 'react-redux';
import { selectAccessToken } from 'slices/tokenSlice';
import { useContext } from 'react';
import { OwnerContext } from '../../MainSection';
import { useSearchParams } from 'react-router-dom';

function AddCover(props) {
  const isOwner = useContext(OwnerContext);
  
  const [searchParams] = useSearchParams();
  const pageId = searchParams.get('id');
  
  const [saveCover] = useSaveCoverMutation();
  const accessToken = useSelector(selectAccessToken);

  const handleUploadCover = async (e) => {
    if (e.target.files[0] && isOwner) {
      const formData = new FormData();
      formData.append('file', e.target.files[0]);
      await saveCover({
        cover: formData,
        pageId,
        accessToken,
      });
    }
  };

  return (
    <div className={styles.wrapper}>
      <button className={classNames('no-border-button', styles.container)}>
        <label htmlFor="coverImg">📃 Upload cover</label>
        <input
          type="file"
          id="coverImg"
          name="filename"
          accept="image/*"
          onChange={handleUploadCover}
        ></input>
      </button>
    </div>
  );
}

export default AddCover;
