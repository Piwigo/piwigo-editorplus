{combine_css path="{$EP_PATH}admin/css/editorplus_common.css" order=0}
{combine_script id='editorplus_quill' load='footer' path="{$EP_PATH}admin/js/editorplus_quill.js"}
{combine_script id='editorplus_common' load='footer' path="{$EP_PATH}admin/js/editorplus_common.js"}
<script type="module" src="{$EP_PATH}admin/js/editorplus_ckeditor.js"></script>
{footer_script}
const EP_PATH = '{$EP_PATH|escape:javascript}';
const EP_CURRENT_PAGE = '{$EP_PAGE|escape:javascript}';
const EP_TEXTAREA = [{$EP_TEXTAREA_ID[0]|json_encode}];
const EP_TEXTAREA_CKEDITOR = [{$EP_TEXTAREA_ID[1]|json_encode}];
const EP_SHOW_HIDE = "{'Show/Hide'|translate|escape:javascript}";
const EP_CONFIG_EDITOR = {$EP_CONFIG_EDITOR|json_encode};
const PWG_THEMECONF = {$themeconf['colorscheme']|json_encode};
const EP_USER_LANGUAGE = '{$EP_USER_LANGUAGE|escape:javascript}';
{/footer_script}

