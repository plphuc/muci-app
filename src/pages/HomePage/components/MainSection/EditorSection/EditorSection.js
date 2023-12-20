import { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import { useEditPageMutation, useLazyGetPageQuery } from 'slices/pageSlice';
import { selectAccessToken } from 'slices/tokenSlice';
import EditorJS from '@editorjs/editorjs';
import { DEFAULT_INITIAL_DATA } from 'common/utils/contants';
import { EDITOR_JS_TOOLS } from 'config/editorConfigs';
import styles from './EditorSection.module.css';

function EditorSection(props) {
  const ejInstance = useRef();
  const accessToken = useSelector(selectAccessToken);

  const [searchParams, setSearchParams] = useSearchParams();
  const pageId = searchParams.get('id');
  const [editPage] = useEditPageMutation();

  const initEditor = () => {
    const editor = new EditorJS({
      holder: 'editorjs',
      onReady: () => {
        ejInstance.current = editor;
      },
      data: DEFAULT_INITIAL_DATA,
      tools: EDITOR_JS_TOOLS,
    });
  };

  // auto save
  // useEffect(() => {
  //   const saveData = async () => {
  //     try {
  //       const content = await ejInstance.current?.save();
  //       await editPage({accessToken, pageId, content})
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   const intervalId = setInterval(async () => {
  //     if (accessToken) {
  //       await saveData();
  //     }
  //   }, 5000);
  //   return () => clearInterval(intervalId);
  // }, []);

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
