import EditorSection from "./components/EditorSection/EditorSection"; 
import SidebarSection from "./components/SidebarSection/SidebarSection";

import styles from 'App.module.css'
function App() {

  return (
    <div className={styles.wrapper}>
      <SidebarSection />
      <EditorSection />
    </div>
    )
}

export default App;