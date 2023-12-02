import classNames from 'classnames';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';

import DisplayFeature from '../DisplayFeature/DisplayFeature';

import styles from './ImportFeature.module.css';

function ImportFeature(props) {
  const { className } = props;
  return (
    <div className={className}>
      <DisplayFeature iconName={faArrowDown} title='Import'/>
    </div>
  );
}

export default ImportFeature;
