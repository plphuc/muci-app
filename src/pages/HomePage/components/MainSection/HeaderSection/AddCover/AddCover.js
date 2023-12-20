import classNames from 'classnames';
import styles from './AddCover.module.css';
import { useSaveCoverMutation } from 'slices/coverSlice';
import { useSelector } from 'react-redux';
import { selectAccessToken } from 'slices/tokenSlice';
import { useSearchParams } from 'react-router-dom';

function AddCover(props) {
  const [params, setParams] = useSearchParams();
  const [saveCover] = useSaveCoverMutation();
  const accessToken = useSelector(selectAccessToken)

  const handleUploadCover = async (e) => {
    if (e.target.files[0]) {
      const formData = new FormData();
      formData.append('file', e.target.files[0]);
      await saveCover({
        cover: formData,
        pageId: params.get('id'),
        accessToken
      })
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
