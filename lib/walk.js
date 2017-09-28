'use babel';

import Walker from 'node-source-walk';
// TODO: ExportDeclaration(s) needed ?
const TYPES = /ImportDeclaration|ExportNamedDeclaration|ExportDefaultDeclaration|ExportDeclaration/;

module.exports = source => {
  let walker = new Walker();
  let modules = [];

  if(!source) return modules;

  try {
    walker.walk(source, (node) => {
      if(TYPES.test(node.type)) {
        if(node.source && node.source.value) modules.push(node.source);
      } else if (node.type == 'CallExpression'
          && node.callee && node.callee.name == "require") {
          node.arguments.forEach((arg) => { modules.push(arg); });
      }
    });
  } catch (error) {
    console.log("walker:", error);
  }
  return modules;
};
