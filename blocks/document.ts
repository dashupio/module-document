
// import page interface
import { Struct } from '@dashup/module';

/**
 * build address helper
 */
export default class DocumentBlock extends Struct {

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
    return 'fa fa-document-line';
  }

  /**
   * returns page type
   */
  get title() {
    // return page type label
    return 'Document Block';
  }

  /**
   * returns page data
   */
  get data() {
    // return page data
    return {};
  }

  /**
   * returns object of views
   */
  get views() {
    // return object of views
    return {
      view   : 'block/document/view',
      config : 'block/document/config',
    };
  }

  /**
   * returns category list for page
   */
  get categories() {
    // return array of categories
    return ['frontend'];
  }

  /**
   * returns page descripton for list
   */
  get description() {
    // return description string
    return 'Store notes in a handy block';
  }
}