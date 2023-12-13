import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DisplayFeature from '../DisplayFeature/DisplayFeature';

import styles from './AddPageFeature.module.css';
import { useAddPageMutation } from 'slices/pageSlice';
import { useSelector } from 'react-redux';
import { selectAccessToken } from 'slices/tokenSlice';

function AddPageFeature(props) {
  const { className } = props;
  const accessToken = useSelector(selectAccessToken)
  const [addPage] = useAddPageMutation();

  const handleAddPage = async () => {
    await addPage(accessToken)
  }

  return (  
    <div className={className} onClick={handleAddPage}>
      <DisplayFeature icon = {<FontAwesomeIcon icon={faPlus}/>} title='Add a page'/>
    </div>
  );
}

export default AddPageFeature;
