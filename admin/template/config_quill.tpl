{combine_css path="{$EP_PATH}node_modules/quill/dist/quill.snow.css" order=2}
{combine_css path="{$EP_PATH}admin/vendors/fontello/css/editorplus.css" order=-10}
{combine_css path="{$EP_PATH}admin/css/editorplus_quill.css" order=1}
<div class="config-quill-container">
    <p>In the Quill editor's minify mode, you can choose the elements you want in the toolbar.</p>
    <p>To do this, drag and drop the elements into the minify bar.</p>
    <div class="config-quill-fulltoolbar">
        <span class="config-quill-badge" draggable="true"><span class="config-quill-icon epicon-bold"></span></span>
        <span class="config-quill-badge" draggable="true"><span class="config-quill-icon epicon-italic"></span></span>
        <span class="config-quill-badge" draggable="true"><span class="config-quill-icon epicon-underline"></span></span>
        <span class="config-quill-badge" draggable="true"><span class="config-quill-icon epicon-strike"></span></span>
        <span class="config-quill-badge" draggable="true"><span class="config-quill-icon epicon-quote"></span></span>
        <span class="config-quill-badge" draggable="true"><span class="config-quill-icon epicon-code"></span></span>
        <span class="config-quill-badge" draggable="true"><span class="config-quill-icon-long epicon-header-1"></span></span>
        <span class="config-quill-badge" draggable="true"><span class="config-quill-icon-long epicon-list"></span></span>
        <span class="config-quill-badge" draggable="true"><span class="config-quill-icon-long epicon-sub-up"></span></span>
        <span class="config-quill-badge" draggable="true"><span class="config-quill-icon-long epicon-direction"></span></span>
        <span class="config-quill-badge" draggable="true"><span class="config-quill-icon epicon-rtl"></span></span>
        <span class="config-quill-badge" draggable="true">Font size<span class="config-quill-icon epicon-updown"></span></span>
        <span class="config-quill-badge" draggable="true">Heading<span class="config-quill-icon epicon-updown"></span></span>
        <span class="config-quill-badge" draggable="true"><span class="config-quill-icon epicon-color"></span></span>
        <span class="config-quill-badge" draggable="true"><span class="config-quill-icon epicon-background"></span></span>
        <span class="config-quill-badge" draggable="true">Sans serif<span class="ep-icon epicon-updown"></span></span>
        <span class="config-quill-badge" draggable="true"><span class="config-quill-icon epicon-align"></span></span>
        <span class="config-quill-badge" draggable="true"><span class="config-quill-icon epicon-link"></span></span>
        <span class="config-quill-badge" draggable="true"><span class="config-quill-icon epicon-image"></span></span>
        <span class="config-quill-badge" draggable="true"><span class="config-quill-icon epicon-video"></span></span>
        <span class="config-quill-badge" draggable="true"><span class="config-quill-icon epicon-reset"></span></span>
    </div>
    <div class="">
        <p>Quill Toolbar (drag the elements here)</p>
        <div class="config-quill-toolbar">
            <div id="dragzone">

            </div>
            <span class="expand icon-resize-full"></span>
        </div>
    </div>
</div>
{combine_script id='config_quill' load='footer' path="{$EP_PATH}admin/js/config_quill.js"}
<script>
const fontSizeArr2 = [false, '8px', '9px', '10px', '12px', '14px', '16px', '18px', '20px', '24px', '32px', '42px', '54px', '68px', '84px', '98px'];
    const toolbarOptionFull2 = [
    ['bold', 'italic', 'underline', 'strike'],
    ['blockquote', 'code-block'],
    [{ 'header': 1 }, { 'header': 2 }],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    [{ 'script': 'sub' }, { 'script': 'super' }],
    [{ 'indent': '-1' }, { 'indent': '+1' }],
    [{ 'direction': 'rtl' }],
    [{ 'size': fontSizeArr2}],
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    [{ 'color': [] }, { 'background': [] }],
    [{ 'font': [] }],
    [{ 'align': [] }],
    ['link', 'image', 'video'],
    ['clean']
];
let items = document.getElementsByClassName('config-quill-badge');
let dragzone = document.getElementById('dragzone');
console.log(dragzone);

for (item of items) {
    item.addEventListener('dragstart', function(e) {
        let selected = e.target;

        dragzone.addEventListener('dragover', function(e) {
            e.preventDefault();
        });
        dragzone.addEventListener('drop', function(e) {
            dragzone.appendChild(selected);
            selected = undefined;
        });
    });
}
</script>