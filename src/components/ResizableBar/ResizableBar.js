import React from 'react';
import styles from './ResizableBar.module.css';

function ResizableBar(props) {
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
    <div className={styles.wrapper} onMouseDown={handleResizeWidth}>
      <div className={styles.resizeBar}></div>
    </div>
  );
}

export default ResizableBar;
