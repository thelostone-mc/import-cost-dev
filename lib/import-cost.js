'use babel';

import { CompositeDisposable } from 'atom';
import labelize from './labelize';
import codewalk from './walk';
import size from './size';

export default {

  subscriptions: null,
  decoraters: [],

  activate() {
    this.clear();
    this.tail();
    atom.workspace.onDidChangeActivePaneItem(() => this.tail());
    atom.workspace.observeTextEditors(editor => {
      editor.onDidSave(() => this.tail())
    })
  },

  tail () {
    this.clear();
    const editor = atom.workspace.getActiveTextEditor();
    if(!editor) return ;
    const source = editor.getText();
    const modules = codewalk(source);
    modules.forEach(module => {
      const name = module.value
      size(name).then((module_size, version) => {
        this.decoraters.push(labelize(editor, module, module_size));
      }).catch((error) => {
        console.log(error);
      })
    });
  },

  clear() {
    this.decoraters.forEach(decorater => {
      decorater.destroy();
    });
  },

  deactivate() {
    this.subscriptions.dispose()
  }
};
