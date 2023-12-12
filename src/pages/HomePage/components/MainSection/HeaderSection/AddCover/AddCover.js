import classNames from 'classnames';
import styles from './AddCover.module.css';
import { useSaveCoverMutation } from 'slices/coverSlice';
import { useSelector } from 'react-redux';
import { selectAccessToken } from 'slices/tokenSlice';

function AddCover(props) {
  const { handleSetCover, cover } = props;
  const [saveCover] = useSaveCoverMutation();
  const accessToken = useSelector(selectAccessToken)

  const handleUploadCover = async (e) => {
    if (cover) {
      URL.revokeObjectURL(cover);
    }
    if (e.target.files[0]) {
      const src = URL.createObjectURL(e.target.files[0]);
      handleSetCover(src);

      const formData = new FormData();
      formData.append('file', e.target.files[0]);
      await saveCover({
        cover: formData,
        accessToken
      }).unwrap().then(res => {console.log('OK');}).catch(err => {console.log(err);});
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
