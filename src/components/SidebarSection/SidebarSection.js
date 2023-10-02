import styles from './SidebarSection.module.css';

function SidebarSection(props) {
  function handleResizeWidth(e) {
    const resizableSidebar = e.target.parentElement

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
    <div className={styles.wrapper}>
      <div className={styles.resizeBar} onMouseDown={handleResizeWidth}></div>
    </div>
  );
}

export default SidebarSection;
