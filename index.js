// require first
const { Module } = require('@dashup/module');

// import base
const DocumentPage = require('./pages/document');
const DocumentBlock = require('./blocks/document');

/**
 * export module
 */
class DocumentModule extends Module {

  /**
   * construct discord module
   */
  constructor() {
    // run super
    super();
  }
  
  /**
   * registers dashup structs
   *
   * @param {*} register 
   */
  register(fn) {
    // register pages
    fn('page', DocumentPage);

    // register blocks
    fn('block', DocumentBlock);
  }
}

// create new
module.exports = new DocumentModule();
