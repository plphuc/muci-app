import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DisplayFeature from '../DisplayFeature/DisplayFeature';

import styles from './NewPageFeature.module.css';
import { useSelector } from 'react-redux';
import { selectAccessToken } from 'slices/tokenSlice';
import { useAddPageMutation } from 'slices/pageApiSlice';
import { notifyError } from 'common/utils/toastMessage';

function NewPageFeature(props) {
  const { className } = props;
  const accessToken = useSelector(selectAccessToken);
  const [addPage] = useAddPageMutation();

  const handleAddPage = () => {
    addPage(accessToken)
      .unwrap()
      .catch((err) => {
        notifyError('Cannot add page');
      });
  };
  return (
    <div className={className} onClick={handleAddPage}>
      <DisplayFeature
        icon={<FontAwesomeIcon icon={faCirclePlus} />}
        title="New page"
      />
    </div>
  );
}

export default NewPageFeature;
