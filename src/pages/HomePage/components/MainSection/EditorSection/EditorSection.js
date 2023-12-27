import { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import {
  useEditPageMutation,
  useLazyGetPageQuery,
} from 'slices/pageApiSlice';
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
  const [getPage, { data: pageInfo }] = useLazyGetPageQuery();

  const initEditor = (content) => {
    const editor = new EditorJS({
      holder: 'editorjs',
      onReady: () => {
        ejInstance.current = editor;
      },
      data: content || DEFAULT_INITIAL_DATA,
      tools: EDITOR_JS_TOOLS,
    });
  };

  // auto save
  useEffect(() => {
    const intervalId = setInterval(async () => {
      const saveData = async () => {
        try {
          const content = await ejInstance.current?.save();
          await editPage({ accessToken, pageId, content: {...content}})
        } catch (err) {
          console.log(err);
        }
      };
      
      if (accessToken) {
        await saveData();
      }
    }, 30000);
    return () => clearInterval(intervalId);
  }, [accessToken, pageId]);

  // This will run only once
  useEffect(() => {
    if (accessToken && pageId) {
      getPage({accessToken, pageId}).unwrap().then(res => {
        if (ejInstance.current === null) {
          initEditor(res.content);
        }
      })
      .catch(err => {
        console.log("err", err);
      })
    }

    return () => {
      ejInstance?.current?.destroy();
      ejInstance.current = null;
    };
  }, [accessToken, pageId]);

  return (
    <div className={styles.wrapper}>
      <div id="editorjs"></div>
    </div>
  );
}

export default EditorSection;
