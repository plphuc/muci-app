import { faShapes } from '@fortawesome/free-solid-svg-icons';

import DisplayFeature from '../DisplayFeature/DisplayFeature';

import styles from './TemplatesFeature.module.css';

function TemplatesFeature(props) {
  const { className } = props;
  return (
    <div className={className}>
      <DisplayFeature iconName={faShapes} title='Templates'/>
    </div>
  );
}

export default TemplatesFeature;
