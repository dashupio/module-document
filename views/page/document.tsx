
// import react
import shortid from 'shortid';
import EditorJs from 'react-editor-js';
import React, { useState } from 'react';
import { Box, Page, Button, Container } from '@dashup/ui';

// import base
import Link from '@editorjs/link';
import Code from '@editorjs/code';
import html from 'editorjs-html';
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
const PageDocument = (props = {}) => {
  // groups
  const [share, setShare] = useState(false);
  const [config, setConfig] = useState(false);
  const [parser, setParser] = useState(html());
  const [updating, setUpdating] = useState(false);

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
    <Page { ...props } bodyClass="flex-column">

      <Page.Share show={ share } onHide={ (e) => setShare(false) } />
      <Page.Config show={ config } onHide={ (e) => setConfig(false) } />

      <Page.Menu onConfig={ () => setConfig(true) } presence={ props.presence } onShare={ () => setShare(true) }>
        { props.dashup.can(props.page, 'manage') && (
          <Button variant="contained" color={ updating ? 'success' : 'primary' } onClick={ () => setUpdating(!updating) }>
            { updating ? 'Finish' : 'Update Document' }
          </Button>
        ) }
      </Page.Menu>
      <Page.Body>
        { updating ? (
          <Container>
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
              data={ typeof props.page.get('data.data') === 'string' ? JSON.parse(props.page.get('data.data')) : {} }
              onReady={ (editor) => {
                // check data
                if (!props.page.get('data.data') && props.page.get('data.document')) editor.blocks.renderFromHTML(props.page.get('data.document') || '');
              } }
              onChange={ debounce(async (editor) => {
                // data
                const data = await editor.saver.save();

                // save
                debounce(props.setData)({
                  data : JSON.stringify(data),
                  html : parser.parse(data),
                });
              }, 100) }
            />
          </Container>
        ) : (
          <Container>
            <Box dangerouslySetInnerHTML={ { __html : (props.page.get('data.html') ? props.page.get('data.html').join('') : null) || props.page.get('data.document') || '' } } />
          </Container>
        ) }
      </Page.Body>
    </Page>
  );
};

// export default
export default PageDocument;