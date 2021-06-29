
// import react
import shortid from 'shortid';
import EditorJs from 'react-editor-js';
import React from 'react';

// import base
import Link from '@editorjs/link';
import Code from '@editorjs/code';
import List from '@editorjs/list';
import Table from '@editorjs/table';
import Quote from '@editorjs/quote';
import Image from '@editorjs/image';
import Embed from '@editorjs/embed';
import Marker from '@editorjs/marker';
import Header from '@editorjs/header';
import Warning from '@editorjs/warning';
import Underline from '@editorjs/underline';
import Delimiter from '@editorjs/delimiter';

// global timer
let timer;

// global debounce
const debounce = (func, timeout = 1000) => {

  // return debounced
  return (...args) => {
    // clear timeout previously
    clearTimeout(timer);

    // create new timeout
    timer = setTimeout(() => func(...args), timeout);
  };
}

// create chart block
const BlockDocument = (props = {}) => {

  // upload by url
  const uploadByUrl = async (url) => {
    // return uploaded
    return {
      file : {
        url,
      },
      success : 1,
    };
  };

  // upload by file
  const uploadByFile = async (image) => {
    // loop image
    if (!image) return;

    // create form data
    const data = new FormData();

    // append image
    data.append('file', image);
    data.append('temp', shortid());

    // submit ajax form
    const res = await fetch('/media/image', {
      body   : data,
      method : 'POST',
    });

    // await json
    const result = await res.json();

    // upload
    const { upload } = result;

    // return uploaded
    return {
      file : {
        url : upload.url,
      },
      success : 1,
    };
  };

  // return jsx
  return (
    <div className="card h-100">
      { !!props.block.label && (
        <div className="card-header">
          { props.block.label }
        </div>
      ) }
      <div className="card-body">
        <div className="w-100 h-100 fit-content">
          <EditorJs
            tools={ {
              code      : Code,
              link      : Link,
              list      : List,
              quote     : Quote,
              table     : Table,
              header    : Header,
              marker    : Marker,
              warning   : Warning,
              underline : Underline,
              delimiter : Delimiter,
              embed : {
                class  : Embed,
                config : {
                  services : {
                    coub    : true,
                    youtube : true,
                  }
                },
                inlineToolbar : true
              },
              image : {
                class  : Image,
                config : {
                  uploader : {
                    uploadByUrl,
                    uploadByFile,
                  },
                }
              }
            } }
            data={ typeof props.block.data === 'string' ? JSON.parse(props.block.data) : {} }
            onChange={ debounce(async (editor) => {
              // data
              const data = await editor.saver.save();

              // save
              debounce(props.setBlock)(props.block, 'data', JSON.stringify(data));
            }, 100) }
          />
        </div>
      </div>
    </div>
  );
};

// export default
export default BlockDocument;