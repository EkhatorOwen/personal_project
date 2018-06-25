import React, { Component } from 'react'
import FroalaEditorView from 'react-froala-wysiwyg/FroalaEditorView';
import FroalaEditor from 'react-froala-wysiwyg';

import 'froala-editor/js/froala_editor.pkgd.min.js';
import 'font-awesome/css/font-awesome.css';


export default class ComposeMessage extends Component {
  render() {
    return (
      <div>
      <FroalaEditor
            tag='textarea'
            />
      </div>
    )
  }
}
