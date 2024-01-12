{combine_css path="{$EP_PATH}admin/css/editorplus_{$EP_EDITOR}.css" order=0}
{combine_script id='editorplus_{$EP_EDITOR}' load='footer' path="{$EP_PATH}admin/js/editorplus_{$EP_EDITOR}.js"}
{footer_script}
const EP_PATH = '{$EP_PATH|escape:javascript}';
const EP_CURRENT_PAGE = '{$EP_PAGE|escape:javascript}';
const EP_TEXTAREA = {$EP_TEXTAREA_ID|json_encode};
const EP_SAVE = {$EP_TEXTAREA_ID|json_encode};
const EP_CONFIG_QUILL = {$EP_CONFIG_QUILL|json_encode};
{/footer_script}