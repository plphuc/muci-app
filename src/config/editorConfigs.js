import Embed from '@editorjs/embed';
import Table from '@editorjs/table';
import List from '@editorjs/list';
import Code from '@editorjs/code';
import LinkTool from '@editorjs/link';
import Image from '@editorjs/image';
import Header from '@editorjs/header';
import Quote from '@editorjs/quote';
import Marker from '@editorjs/marker';
import CheckList from '@editorjs/checklist';
import Delimiter from '@editorjs/delimiter';
import InlineCode from '@editorjs/inline-code';
import SimpleImage from '@editorjs/simple-image';

export const EDITOR_JS_TOOLS = {
  embed: Embed,
  table: Table,
  marker: Marker,
  list: List,
  code: Code,
  linkTool: LinkTool,
  image: {
    class: Image,
    config: {
      uploader: {
        async uploadByFile(file) {
          const formData = new FormData();
          formData.append('file', file);

          const response = await fetch(`http://localhost:8080/uploadImage/uploadByFile`, {
            method: 'POST',
            mode: 'cors',
            body: formData,
          });

          const data = await response.json();

          if (data.success === 1) {
            return data;
          }
        },
        async uploadByUrl(url) {
          const response = await fetch(`http://localhost:8080/uploadImage/uploadByUrl`, {
            method: 'POST',
            mode: 'cors',
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({url: url}),
          });

          const data = await response.json();

          if (data.success === 1) {
            return data;
          }
        },
      },
    },
  },
  header: {
    class: Header,
    config: {
      placeholder: 'Enter a header',
      levels: [1, 2, 3, 4],
      defaultLevel: 3,
    },
  },
  quote: Quote,
  checklist: CheckList,
  delimiter: Delimiter,
  inlineCode: InlineCode,
  simpleImage: SimpleImage,
};