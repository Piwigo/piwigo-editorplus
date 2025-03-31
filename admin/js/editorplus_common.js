function epShowHideTextArea(selector, editor, label) {
  const textarea = $(`#${selector}`);
  textarea.after(`<span class="ep-show-hide" data-textarea="${selector}" data-editor="${editor}">${label}</span>`)
  $('.ep-show-hide').off('click').on('click', function () {
    const textarea = $(this).data('textarea');
    const editor = $(this).data('editor');
    if ($(`#${textarea}`).is(':visible')) {
      const newValue = $(`#${textarea}`).val();
      const iframe = document.getElementById(`i${editor}`);
      if (iframe.contentWindow.editor) {
        iframe.contentWindow.editor.setData(newValue);
      }
    }
    $(`#${textarea}`).toggle();
    $(`#${editor}`).toggle();
  });
}