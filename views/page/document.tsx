
// import react
import { Page } from '@dashup/ui';
import React, { useState } from 'react';

// create chart block
const PageDocument = (props = {}) => {
  // groups
  const [config, setConfig] = useState(false);
  const [updating, setUpdating] = useState(false);

  // return jsx
  return (
    <Page { ...props } bodyClass="flex-column">

      <Page.Config show={ config } onHide={ (e) => setConfig(false) } />

      <Page.Menu onConfig={ () => setConfig(true) } onShare>
        { props.dashup.can(props.page, 'manage') && (
          <button className={ `me-2 btn btn-${!updating ? 'link text-dark' : 'primary'}` } onClick={ (e) => setUpdating(!updating) }>
            <i className={ `fat fa-${!updating ? 'pencil' : 'check'} me-2` } />
            { !updating ? 'Update Document' : 'Finish Updating' }
          </button>
        ) }
      </Page.Menu>
      <Page.Body>
        EDITOR
      </Page.Body>
    </Page>
  );
};

// export default
export default PageDocument;