import { useRef, useEffect, useContext } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import { useEditPageMutation } from 'slices/pageApiSlice';
import { selectAccessToken } from 'slices/tokenSlice';
import EditorJS from '@editorjs/editorjs';
import { DEFAULT_INITIAL_DATA } from 'common/utils/contants';
import { EDITOR_JS_TOOLS } from 'config/editorConfigs';
import styles from './EditorSection.module.css';
import { notifyError } from 'common/utils/toastMessage';
import { OwnerContext, PageContext } from '../MainSection';

function EditorSection(props) {
  const ejInstance = useRef();
  const isOwner = useContext(OwnerContext);
  const pageInfo = useContext(PageContext);

  const accessToken = useSelector(selectAccessToken);
  const [searchParams] = useSearchParams();
  const pageId = searchParams.get('id');

  const [editPage] = useEditPageMutation();

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

  const saveData = async () => {
    try {
      const content = await ejInstance.current?.save();
      // only save if user is owner of the page
      await editPage({ accessToken, pageId, content: { ...content } }).unwrap();
    } catch (err) {
      notifyError('Something went wrong, cannot auto save content');
    }
  };

  const handleSaveContent = async (e) => {
    if ((e.ctrlKey && e.key === 's') || e.keyCode === 13 ) {
      await saveData();
    }
  }

  // auto save
  useEffect(() => {
    if (accessToken && isOwner) {
      const intervalId = setInterval(async () => {
        await saveData();
      }, 30000);
      return () => clearInterval(intervalId);
    }
  }, [accessToken, pageId, isOwner]);

  // This will run only once in initial
  useEffect(() => {
    if (pageInfo) {
      const content = {
        time: pageInfo.time,
        blocks: pageInfo.blocks,
        version: pageInfo.version,
      };
      if (ejInstance.current === null) {
        initEditor(content);
      }
    }
    return () => {
      ejInstance?.current?.destroy();
      ejInstance.current = null;
    };
  }, [pageInfo?.id]);

  return (
    <div className={styles.wrapper} onKeyDown={handleSaveContent}>
      <div id="editorjs"></div>
    </div>
  );
}

export default EditorSection;
