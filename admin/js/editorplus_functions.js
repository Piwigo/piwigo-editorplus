export function convertValueCKEditor(value) {
  const tempContainer = document.createElement('div');
  tempContainer.innerHTML = value;

  const codes = tempContainer.querySelectorAll('code');
  if (codes.length) {
    codes.forEach((c, i) => {
      c.style.backgroundColor = 'hsla(0, 0%, 78%, .3)';
      c.style.borderRadius = '2px';
      c.style.padding = '.15em';
    });
  }

  const blockQuotes = tempContainer.querySelectorAll('blockquote');
  if (blockQuotes.length) {
    blockQuotes.forEach((b, i) => {
      b.style.borderLeft = '5px solid #ccc';
      b.style.fontStyle = 'italic';
      b.style.marginLeft = '10px';
      b.style.marginRight = '0';
      b.style.overflow = 'hidden';
      b.style.paddingLeft = '1.5em';
      b.style.paddingRight = '1.5em';
      b.style.width = 'fit-content';
    });
  }

  const tables = tempContainer.querySelectorAll('table');
  if (tables.length) {
    tables.forEach((t, i) => {
      t.style.borderSpacing = '0';

      const items = t.querySelectorAll('td');
      if (items.length) {
        items.forEach((td, i) => {
          td.style.border = '1px solid #bfbfbf';
          td.style.width = '2em';
          td.style.padding = '.4em';
        });
      }
      
    });
  }

  return tempContainer.innerHTML;
}