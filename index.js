// require first
const { Module } = require('@dashup/module');

// import base
const DocumentPage = require('./pages/document');

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
  }
}

// create new
module.exports = new DocumentModule();
