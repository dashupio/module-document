
// import react
import React from 'react';

// create chart block
const BlockDocument = (props = {}) => {

  // return jsx
  return (
    <div class="card h-100">
      { !!props.block.label && (
        <div class="card-header">
          { props.block.label }
        </div>
      ) }
      <div class="card-body p-0 d-flex">
        EDITOR TODO
      </div>
    </div>
  );
};

// export default
export default BlockDocument;