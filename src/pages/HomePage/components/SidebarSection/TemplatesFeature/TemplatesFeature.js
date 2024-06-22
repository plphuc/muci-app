import { faShapes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DisplayFeature from '../DisplayFeature/DisplayFeature';

function TemplatesFeature(props) {
  const { className } = props;
  return (
    <div className={className}>
      <DisplayFeature icon={<FontAwesomeIcon icon={faShapes}/>} title='Templates'/>
    </div>
  );
}

export default TemplatesFeature;
