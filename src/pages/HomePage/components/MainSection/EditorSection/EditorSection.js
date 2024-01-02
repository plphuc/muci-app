import { useRef, useEffect, useContext } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { useEditPageMutation, useLazyGetPageQuery } from 'slices/pageApiSlice';
import { selectAccessToken } from 'slices/tokenSlice';
import EditorJS from '@editorjs/editorjs';
import { DEFAULT_INITIAL_DATA } from 'common/utils/contants';
import { EDITOR_JS_TOOLS } from 'config/editorConfigs';
import styles from './EditorSection.module.css';
import { notifyError } from 'common/utils/toastMessage';
import { selectUserInfo } from 'slices/userSlice';
import { OwnerContext } from '../MainSection';

function EditorSection(props) {
  const ejInstance = useRef();
  const isOwner = useContext(OwnerContext);

  const accessToken = useSelector(selectAccessToken);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const pageId = searchParams.get('id');

  const [editPage] = useEditPageMutation();
  const [getPage] = useLazyGetPageQuery();

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
    console.log(pageId);
    const intervalId = setInterval(async () => {
      const saveData = async () => {
        try {
          const content = await ejInstance.current?.save();

          // only save if user is owner of the page
          if (isOwner) {
            await editPage({ accessToken, pageId, content: { ...content } });
          }
        } catch (err) {
          notifyError('Something went wrong, cannot auto save content');
        }
      };

      if (accessToken) {
        await saveData();
      }
    }, 30000);
    return () => clearInterval(intervalId);
  }, [accessToken, pageId]);

  // This will run only once in initial
  useEffect(() => {
    if (accessToken && pageId) {
      getPage({ accessToken, pageId })
        .unwrap()
        .then((res) => {
          if (ejInstance.current === null) {
            initEditor(res.content);
          }
        })
        .catch((err) => {
          navigate('/404');
        });
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
