import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DisplayFeature from '../DisplayFeature/DisplayFeature';

import styles from './AddPageFeature.module.css';
import { useAddPageMutation } from 'slices/pageSlice';
import { useSelector } from 'react-redux';
import { selectAccessToken } from 'slices/tokenSlice';
import { toast } from 'react-toastify';


export const notifySuccess = (message) =>
  toast(<p style={{ fontSize: 16 }}>{message}</p>, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    newestOnTop: false,
    closeOnClick: true,
    rtl: false,
    pauseOnFocusLoss: true,
    draggable: true,
    pauseOnHover: true,
    type: "success"
  });

export const notifyError = (message) =>
  toast(<p style={{ fontSize: 16 }}>{message}</p>, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    newestOnTop: false,
    closeOnClick: true,
    rtl: false,
    pauseOnFocusLoss: true,
    draggable: true,
    pauseOnHover: true,
    type: "error"
  });

function AddPageFeature(props) {
  const { className } = props;
  const accessToken = useSelector(selectAccessToken)
  const [addPage] = useAddPageMutation();

  const handleAddPage = async () => {
    await addPage(accessToken).unwrap().catch((err) => {
      notifyError("Cannot add page");
    })
  }

  return (  
    <div className={className} onClick={handleAddPage}>
      <DisplayFeature icon = {<FontAwesomeIcon icon={faPlus}/>} title='Add a page'/>
    </div>
  );
}

export default AddPageFeature;
