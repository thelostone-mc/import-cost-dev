'use babel';

import { Point } from 'atom';

module.exports = (editor, module, module_size) => {
  if(!module_size) return;

  const row = (module.loc.start.line - 1);
  const col = editor.lineLengthForScreenRow(row);
  const point = new Point(row, col);
  const marker = editor.markScreenPosition(point);
  const span = document.createElement("span");
  span.className = "label";
  span.textContent = module_size;

  const decorater = editor.decorateMarker(marker, {
    type: "overlay",
    item: span
  });
  return decorater;
}
