{combine_css path="{$EP_PATH}admin/css/plugin.css" order=0}
{combine_css path="{$EP_PATH}node_modules/quill/dist/quill.snow.css" order=2}
{combine_css path="{$EP_PATH}admin/vendors/fontello/css/editorplus.css" order=-10}
{combine_css path="{$EP_PATH}admin/css/editorplus_quill.css" order=1}
{assign var="helper_gif" value="{$EP_PATH}admin/assets/helper-clear.gif"}
{if $themeconf['colorscheme'] == 'dark'}
    {combine_css path="{$EP_PATH}admin/css/plugin_dark.css" order=3}
    {assign var="helper_gif" value="{$EP_PATH}admin/assets/helper-dark.gif"}
{/if}
<section class="ep-container">
    <h2>{"EditorPlus"|translate}</h2>
    <div class="ep-config">
        <div class="ep-config-title">
            <div class="ep-icon-wrapper">
                <span class="icon-yellow"><i class="icon-cog-alt"></i></span>
            </div>
            <h4>{"Options"|translate}</h4>
        </div>
        <span class="icon-spin6 animate-spin load-quill"> </span>
        <div class="config-quill-container">
            <p>{"With EditorPlus minify mode (small display), you can choose a few items to add to the toolbar."|translate}</p>
            <p>{"To do this, drag and drop items into the minify toolbar."|translate}</p>
            <p>{"Due to the space restrictions you can't choose them all."|translate}</p>
            <div class="config-quill-fulltoolbar dropzone" id="quill_items">
                <span class="config-quill-badge tiptip" title="{"Bold"|translate}" data-length="1" data-quill="button/ql-bold"> <span class="config-quill-icon epicon-bold"></span></span>
                <span class="config-quill-badge tiptip" title="{"Italic"|translate}" data-length="1" data-quill="button/ql-italic"> <span class="config-quill-icon epicon-italic"></span></span>
                <span class="config-quill-badge tiptip" title="{"Underline"|translate}" data-length="1" data-quill="button/ql-underline"> <span class="config-quill-icon epicon-underline"></span></span>
                <span class="config-quill-badge tiptip" title="{"Strike"|translate}" data-length="1" data-quill="button/ql-strike"> <span class="config-quill-icon epicon-strike"></span></span>
                <span class="config-quill-badge tiptip" title="{"Quote"|translate}" data-length="1" data-quill="button/ql-blockquote"> <span class="config-quill-icon epicon-quote"></span></span>
                <span class="config-quill-badge tiptip" title="{"Heading"|translate}" data-length="2" data-quill="button/ql-header"> <span class="config-quill-icon-long epicon-header-1"></span></span>
                <span class="config-quill-badge tiptip" title="{"List"|translate}" data-length="2" data-quill="button/ql-list"> <span class="config-quill-icon-long epicon-list"></span></span>
                <span class="config-quill-badge tiptip" title="{"Sub / Up"|translate}" data-length="2" data-quill="button/ql-script"> <span class="config-quill-icon-long epicon-sub-up"></span></span>
                <span class="config-quill-badge tiptip" title="{"Direction"|translate}" data-length="2" data-quill="button/ql-indent"> <span class="config-quill-icon-long epicon-direction"></span></span>
                <span class="config-quill-badge tiptip" title="{"RTL"|translate}" data-length="1" data-quill="button/ql-direction"> <span class="config-quill-icon epicon-rtl"></span></span>
                <span class="config-quill-badge tiptip" title="{"Font size"|translate}" data-length="3" data-quill="span/ql-size">Font size<span class="config-quill-icon epicon-updown"></span></span>
                <span class="config-quill-badge tiptip" title="{"Heading list"|translate}" data-length="3" data-quill="span/ql-header">Heading<span class="config-quill-icon epicon-updown"></span></span>
                <span class="config-quill-badge tiptip" title="{"Color"|translate}" data-length="1" data-quill="span/ql-color"> <span class="config-quill-icon epicon-color"></span></span>
                <span class="config-quill-badge tiptip" title="{"Background color"|translate}" data-length="1" data-quill="span/ql-background"> <span class="config-quill-icon epicon-background"></span></span>
                <span class="config-quill-badge tiptip" title="{"Font"|translate}" data-length="3" data-quill="span/ql-font">Sans serif<span class="ep-icon epicon-updown"></span></span>
                <span class="config-quill-badge tiptip" title="{"Align"|translate}" data-length="1" data-quill="span/ql-align"> <span class="config-quill-icon epicon-align"></span></span>
                <span class="config-quill-badge tiptip" title="{"Link"|translate}" data-length="1" data-quill="button/ql-link"> <span class="config-quill-icon epicon-link"></span></span>
                <span class="config-quill-badge tiptip" title="{"EPImage"|translate}" data-length="1" data-quill="button/ql-image"> <span class="config-quill-icon epicon-image"></span></span>
                <span class="config-quill-badge tiptip" title="{"Video"|translate}" data-length="1" data-quill="button/ql-video"> <span class="config-quill-icon epicon-video"></span></span>
                <span class="config-quill-badge tiptip" title="{"Clean"|translate}" data-length="1" data-quill="button/ql-clean"> <span class="config-quill-icon epicon-reset"></span></span>
            </div>
            <div class="quill-toolbar">
                <p>{"Minify Toolbar (drag items here)"|translate}</p>
                <div class="config-quill-helper">
                    <div class="config-quill-toolbar">
                        <div class="dropzone" id="toolbar-drop"></div>
                        <span class="expand icon-code tiptip" title="{"Show/Hide Preview"|translate}"></span>
                        <span class="expand icon-resize-full tiptip" title="{"Expand/Shrink Editor"|translate}"></span>
                    </div>
                    <span class="icon-helper icon-help-circled"></span>
                </div>
            </div>
            <div class="ep-quill-helper" id="helper-quill-modal">
                <div class="ep-quill-helper-content">
                        <i class="icon-cancel helper-quill-close"></i>
                        <p class="helper-quill-items">
                            <span class="config-quill-badge"> <span class="config-quill-icon epicon-bold"></span></span>
                            <span>{"Item is available for dragging in the minify toolbar."|translate}</span>
                        </p>
                        <p class="helper-quill-items">
                            <span class="config-quill-badge not-sortable"> <span class="config-quill-icon epicon-bold"></span></span>
                            <span>{"Item is not available due to space restriction."|translate}</span>
                        </p>
                        <p class="helper-quill-items">
                            <span class="config-quill-badge badge-helper"> <span class="config-quill-icon epicon-bold"></span></span>
                            <span>{"Item is active in minify toolbar."|translate}</span>
                        </p>
                        <img src="{$helper_gif}" alt="helper quill gif" :>
                </div>
            </div>
        </div>
    </div>
    <div class="ep-fieldset">
        <div class="ep-config-title">
            <div class="ep-icon-wrapper">
                <span class="icon-blue"><i class="icon-dice-solid"></i></span>
            </div>
            <h4>{"Playground"|translate}</h4>
        </div>
        <p>{"This is what the editor looks like throughout Piwigo."|translate}</p>
        <p>{"Here you can play with it and see its features"|translate}</p>
        <div class="ep-content">
            <textarea id="ep-playground" rows="5" cols="33">
                <strong>Hello World! </strong> 
                <p>{"Type something here"|translate}</p> 
            </textarea>
        </div>
    </div>
</section>
<section class="ep-save">
    <div class="info-message icon-ok" id="message_status"></div>
    <span class="buttonLike" id="save"><i class="icon-floppy"></i> {"Save Settings"|translate}</span>
</section>
{combine_script id='config_quill' load='footer' path="{$EP_PATH}admin/js/config_quill.js"}
{combine_script id='jquery-ui-quill' load='footer' path="{$EP_PATH}admin/vendors/jquery-ui/jquery-ui.js"}