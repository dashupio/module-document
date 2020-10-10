
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
    return 'fa fa-server';
  }

  /**
   * returns page type
   */
  get title() {
    // return page type label
    return 'Document Page';
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
      view   : 'page/document/view',
      config : 'page/document/config',
    };
  }

  /**
   * returns category list for page
   */
  get categories() {
    // return array of categories
    return ['API'];
  }

  /**
   * returns page descripton for list
   */
  get description() {
    // return description string
    return 'Document with specific access';
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