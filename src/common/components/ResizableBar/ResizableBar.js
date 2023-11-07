import React from 'react';
import classNames from 'classnames';

import styles from './ResizableBar.module.css';

function ResizableBar(props) {
  const { className } = props;
  function handleResizeWidth(e) {
    const resizableSidebar = e.target.parentElement;

    document.addEventListener('mousemove', resize);
    document.addEventListener('mouseup', stopResize);

    function resize(e) {
      const newWidth = e.clientX;
      resizableSidebar.style.width = newWidth + 'px';
    }

    function stopResize() {
      document.removeEventListener('mousemove', resize);
      document.removeEventListener('mouseup', stopResize);
    }
  }
  return (
    <div className= {classNames(styles.wrapper, className)} onMouseDown={handleResizeWidth}>
    </div>
  );
}

export default ResizableBar;
