/*Check https://www.w3schools.com/jsref/jsref_obj_regexp.asp for regular expression patterns*/
let trim = (x) => {
    let value = String(x)
    return value.replace(/^\s+|\s+$/gm, '');/*(any number of white space characters at the start OR any number of white space characters at the end of each line of a string)*/
    /*Modifiers:
    g:global match
    m:matching each line
    */
  }
  
  let isEmpty = (value) => {
    if (value === null || value === undefined || trim(value) === '' || value.length === 0) {
      return true
    } else {
      return false
    }
  }
  
  /**
   * exporting functions.
   */
  module.exports = {
    isEmpty: isEmpty
  }
  