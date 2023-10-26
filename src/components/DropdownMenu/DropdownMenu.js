import styles from './DropdownMenu.module.css'

function DropdownMenu(props) {
  const {children, style}  = props
  return (
    <div className={styles.wrapper} style={style}>
      {children}
    </div>
  );
}

export default DropdownMenu;