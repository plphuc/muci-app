import { useEffect, useRef } from 'react';
import EditorJS from '@editorjs/editorjs';
import classNames from 'classnames';

import { DEFAULT_INITIAL_DATA } from 'utils/constant';
import { EDITOR_JS_TOOLS } from 'config/config';

import styles from './EditorSection.module.css';

function EditorSection(props) {
  const ejInstance = useRef();

  const initEditor = () => {
    const editor = new EditorJS({
      holder: 'editorjs',
      onReady: () => {
        ejInstance.current = editor;
      },
      autofocus: true,
      data: DEFAULT_INITIAL_DATA,
      onChange: async () => {
        let content = await editor.saver.save();
        console.log(content);
      },
      tools: EDITOR_JS_TOOLS,
    });
  };

  // This will run only once
  useEffect(() => {
    if (ejInstance.current === null) {
      initEditor();
    }

    return () => {
      ejInstance?.current?.destroy();
      ejInstance.current = null;
    };
  }, []);

  return (
    <div className={classNames(styles.wrapper, styles.layout, styles.layoutWide)}>
      <div id="editorjs" className={styles.layoutContent}></div>
    </div>
  );
}

export default EditorSection;
