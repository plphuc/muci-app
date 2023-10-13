import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import DisplayFeature from '../DisplayFeature/DisplayFeature';

import styles from './SearchFeature.module.css';

function SearchFeature(props) {
  const { className } = props;
  return (
    <div className={className}>
      <DisplayFeature iconName={faMagnifyingGlass} title='Search'/>
    </div>
  );
}

export default SearchFeature;
