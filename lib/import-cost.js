'use babel';

import { CompositeDisposable } from 'atom';
import codewalk from './walk';
import size from './size';

export default {

  subscriptions: null,

  activate(state) {
    this.subscriptions = new CompositeDisposable();
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'import-cost:tail': () => this.tail()
    }));
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  tail () {
    //this.clear();
    const editor = atom.workspace.getActiveTextEditor();
    if(!editor) return ;
    const source = editor.getText();
    const modules = codewalk(source);
    modules.forEach(module => {
      size(module).then((module_size, version) => {
        //TODO: Create element
        console.log(module, module_size, version);
      }).catch((error) => {
        console.log(error);
      })
    });
  }
};
