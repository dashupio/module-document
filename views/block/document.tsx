
// import react
import React from 'react';

// create chart block
const BlockDocument = (props = {}) => {

  // return jsx
  return (
    <div className="card h-100">
      { !!props.block.label && (
        <div className="card-header">
          { props.block.label }
        </div>
      ) }
      <div className="card-body p-0 d-flex">
        EDITOR TODO
      </div>
    </div>
  );
};

// export default
export default BlockDocument;