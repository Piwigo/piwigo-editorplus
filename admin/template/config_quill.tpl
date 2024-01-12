{combine_css path="{$EP_PATH}node_modules/quill/dist/quill.snow.css" order=2}
{combine_css path="{$EP_PATH}admin/vendors/fontello/css/editorplus.css" order=-10}
{combine_css path="{$EP_PATH}admin/css/editorplus_quill.css" order=1}
<div class="config-quill-container">
    <p>In the Quill editor's minify mode, you can choose the elements you want in the toolbar.</p>
    <p>To do this, drag and drop the elements into the minify bar.</p>
    <div class="config-quill-fulltoolbar dropzone" id="quill_items">
        <span class="config-quill-badge" data-length="1" data-quill="button/ql-bold"><span class="config-quill-icon epicon-bold"></span></span>
        <span class="config-quill-badge" data-length="1" data-quill="button/ql-italic"><span class="config-quill-icon epicon-italic"></span></span>
        <span class="config-quill-badge" data-length="1" data-quill="button/ql-underline"><span class="config-quill-icon epicon-underline"></span></span>
        <span class="config-quill-badge" data-length="1" data-quill="button/ql-strike"><span class="config-quill-icon epicon-strike"></span></span>
        <span class="config-quill-badge" data-length="1" data-quill="button/ql-blockquote"><span class="config-quill-icon epicon-quote"></span></span>
        <span class="config-quill-badge" data-length="1" data-quill="button/ql-code-block"><span class="config-quill-icon epicon-code"></span></span>
        <span class="config-quill-badge" data-length="2" data-quill="button/ql-header"><span class="config-quill-icon-long epicon-header-1"></span></span>
        <span class="config-quill-badge" data-length="2" data-quill="button/ql-list"><span class="config-quill-icon-long epicon-list"></span></span>
        <span class="config-quill-badge" data-length="2" data-quill="button/ql-script"><span class="config-quill-icon-long epicon-sub-up"></span></span>
        <span class="config-quill-badge" data-length="2" data-quill="button/ql-indent"><span class="config-quill-icon-long epicon-direction"></span></span>
        <span class="config-quill-badge" data-length="1" data-quill="button/ql-direction"><span class="config-quill-icon epicon-rtl"></span></span>
        <span class="config-quill-badge" data-length="3" data-quill="span/ql-size">Font size<span class="config-quill-icon epicon-updown"></span></span>
        <span class="config-quill-badge" data-length="3" data-quill="span/ql-header">Heading<span class="config-quill-icon epicon-updown"></span></span>
        <span class="config-quill-badge" data-length="1" data-quill="span/ql-color"><span class="config-quill-icon epicon-color"></span></span>
        <span class="config-quill-badge" data-length="1" data-quill="span/ql-background"><span class="config-quill-icon epicon-background"></span></span>
        <span class="config-quill-badge" data-length="3" data-quill="span/ql-font">Sans serif<span class="ep-icon epicon-updown"></span></span>
        <span class="config-quill-badge" data-length="1" data-quill="span/ql-align"><span class="config-quill-icon epicon-align"></span></span>
        <span class="config-quill-badge" data-length="1" data-quill="button/ql-link"><span class="config-quill-icon epicon-link"></span></span>
        <span class="config-quill-badge" data-length="1" data-quill="button/ql-image"><span class="config-quill-icon epicon-image"></span></span>
        <span class="config-quill-badge" data-length="1" data-quill="button/ql-video"><span class="config-quill-icon epicon-video"></span></span>
        <span class="config-quill-badge" data-length="1" data-quill="button/ql-clean"><span class="config-quill-icon epicon-reset"></span></span>
    </div>
    <div class="quill-toolbar">
        <p>Quill Toolbar (drag the elements here)</p>
        <div class="config-quill-toolbar">
            <div id="toolbar-drop" class="dropzone">

            </div>
            <span class="expand icon-resize-full"></span>
        </div>
    </div>
    <span class="buttonLike" id="save"><i class="icon-floppy"></i> Save Settings</span>
</div>
<div id="message_status" class=""><i id="message_status_icon" class=""></i> <span id="message_status_content"></span></div>
{combine_script id='config_quill' load='footer' path="{$EP_PATH}admin/js/config_quill.js"}
{combine_script id='jquery-ui-quill' load='footer' path="{$EP_PATH}admin/vendors/jquery-ui/jquery-ui.js"}
{footer_script}
const EP_CONFIG = {$EP_CONFIG|json_encode};
{/footer_script}