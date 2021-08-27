
// import page interface
import { Struct } from '@dashup/module';

/**
 * build address helper
 */
export default class DocumentPage extends Struct {
  /**
   * constructor
   *
   * @param args 
   */
  constructor(...args) {
    // run super
    super(...args);

    // sanitise
    this.keyAction = this.keyAction.bind(this);
  }

  /**
   * returns page type
   */
  get type() {
    // return page type label
    return 'document';
  }

  /**
   * returns page type
   */
  get icon() {
    // return page type label
    return 'fad fa-file-alt text-info';
  }

  /**
   * returns page type
   */
  get title() {
    // return page type label
    return 'Document';
  }

  /**
   * returns page data
   */
  get actions() {
    // return page data
    return {
      key : this.keyAction,
    };
  }

  /**
   * returns object of views
   */
  get views() {
    // return object of views
    return {
      view : 'page/document',
    };
  }

  /**
   * returns category list for page
   */
  get categories() {
    // return array of categories
    return ['Misc'];
  }

  /**
   * returns page descripton for list
   */
  get description() {
    // return description string
    return 'Internal documentation view';
  }

  /**
   * document key
   *
   * @param args 
   */
  async keyAction(opts, page) {
    // load key
    const key = await this.dashup.connection.rpc(opts, 'page.key', page);

    // return key
    return key;
  }
}