import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DisplayFeature from '../DisplayFeature/DisplayFeature';


function ImportFeature(props) {
  const { className } = props;
  return (
    <div className={className}>
      <DisplayFeature icon={<FontAwesomeIcon icon={faArrowDown}/>} title='Import'/>
    </div>
  );
}

export default ImportFeature;
