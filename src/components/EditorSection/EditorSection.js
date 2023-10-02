import { useEffect, useRef } from 'react';
import EditorJS from '@editorjs/editorjs';

import { DEFAULT_INITIAL_DATA } from 'utils/contants';
import { EDITOR_JS_TOOLS } from 'utils/utils';

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
        // let content = await editor.saver.save();
        // console.log(content);
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
    <div className={styles.wrapper}>
      <div id="editorjs"></div>
    </div>
  );
}

export default EditorSection;
