import MainSection from "components/MainSection/MainSection";
import SidebarSection from "./components/SidebarSection/SidebarSection";

import styles from 'App.module.css'
function App() {

  return (
    <div className={styles.wrapper}>
      <SidebarSection />
      <MainSection />
    </div>
    )
}

export default App;