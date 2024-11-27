function ckGenerateIframe(selector, value, height) {
  const iCKEditor = `
  <html>
  <head>
    <link href="${EP_PATH}admin/vendors/ckeditor5/ckeditor5.css" rel="stylesheet">
    <link href="${EP_PATH}admin/css/iframe_ckeditor.css" rel="stylesheet">
    <link href="admin/themes/default/fontello/css/fontello.css" rel="stylesheet">
    <script type="module" src="${EP_PATH}admin/vendors/ckeditor5/ckeditor5-editor.js"></script>
    <style>
    .ck-editor__editable_inline:not(.ck-comment__input *) {
      height: ${height - 45}px;
      overflow-y: auto;
    }
    </style>
  </head>
  <body>
    <textarea id="${selector}">${value}</textarea>
  </body>
  <script>
  const EP_TEXTAREA_CKEDITOR = "${EP_TEXTAREA_CKEDITOR}";
  const EP_CURRENT_PAGE = "${EP_CURRENT_PAGE}";
  const EP_USER_LANGUAGE = "${EP_USER_LANGUAGE}";
  </script>
  </html>
  `;

  return iCKEditor;
}

$(function () {
  if (EP_CURRENT_PAGE == 'album') { 
    $('#desc-zoom-square').css('display', 'none'); 
  }
  EP_TEXTAREA_CKEDITOR.forEach((selector) => {
    const textarea = $(`#${selector}`);
    if (!textarea.length) return;
    const iframe = document.createElement('iframe');
    const flexHeight = 'album' == EP_CURRENT_PAGE ? 30 : 150;
    const height = textarea.innerHeight() + flexHeight;
    const container = $('<div>').attr({
      id: `ck-${EP_TEXTAREA_CKEDITOR}`,
      class: "ck-container",
    });

    iframe.classList.add('ck-iframe');
    iframe.style.height = height;
    iframe.id = `ick-${EP_TEXTAREA_CKEDITOR}`;
    container.append(iframe);
    textarea.hide();
    textarea.after(container);
    const iDocument = iframe.contentDocument || iframe.contentWindow?.document;

    iDocument.open();
    iDocument.write(ckGenerateIframe(selector, textarea.val(), height));
    iDocument.close();
  });
});
