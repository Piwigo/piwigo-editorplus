{combine_css path="{$EP_PATH}admin/css/editorplus_ckeditor.css" order=0}
<script type="module" src="{$EP_PATH}admin/js/editorplus_{$EP_EDITOR}.js"></script>
{footer_script}
const EP_PATH = '{$EP_PATH|escape:javascript}';
const EP_CURRENT_PAGE = '{$EP_PAGE|escape:javascript}';
const EP_TEXTAREA_CKEDITOR = {$EP_TEXTAREA_ID|json_encode};
const PWG_THEMECONF = {$themeconf['colorscheme']|json_encode};
const EP_USER_LANGUAGE = '{$EP_USER_LANGUAGE|escape:javascript}';
{/footer_script}