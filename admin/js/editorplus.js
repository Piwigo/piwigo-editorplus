const fontSizeArr = [false,'8px','9px','10px','12px','14px','16px','18px','20px','24px','32px','42px','54px','68px','84px','98px'];
const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],
  [{ 'align': [] }],
  [{ 'color': [] }, { 'background': [] }],
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  [{ 'size': fontSizeArr }],
  [{ 'font': [] }],
  [ 'link', 'image', 'video', 'blockquote'],

  ['clean']
];

const example_quill_iframe = `
<html>
<head>
    <link href="`+EP_PATH+`node_modules/quill/dist/quill.snow.css" rel="stylesheet">
    <style>
        body, html {
            margin: 0;
            padding: 0;
            height: 100%;
            width: 100%;
        }
        .ep-content {
            height: calc(100% - 66px); 
        }
        .ql-snow .ql-picker.ql-size .ql-picker-label::before {
            content: "Font size";
        }
        .ql-snow .ql-size .ql-picker-item::before,
        .ql-snow .ql-size .ql-picker-label.ql-active::before{
           content: attr(data-value) !important;
        }
        .ql-snow .ql-picker.ql-size .ql-picker-item:not([data-value])::before {
            content: "Normal" !important;
        }
        .ql-snow .ql-picker.ql-header .ql-picker-label::before {
            content: "Heading";
        }
    </style>
    <script src="`+EP_PATH+`node_modules/quill/dist/quill.js"></` + `script>
</head>
<body>
    <div class="ep-content" id="%EDITOR_ID%"></div>
</body>
</html>`;

$(document).ready(function() {
    $('textarea').each(function() {

        const textarea = $(this);
        const textarea_height = textarea.innerHeight() + 150;
        const quill_id = textarea.attr('id') ? textarea.attr('id') : textarea.attr('name') + '-quill';
        const unique_iframe = new Date().getTime();
        const quill_iframe_id = quill_id + '-iframe' + unique_iframe;
        const quill_iframe = '<iframe name="'+quill_iframe_id+'" id="'+quill_iframe_id+'" style="width:100%;height:'+textarea_height+'px" frameborder="0" ></iframe>';

        textarea.hide();
        textarea.after(quill_iframe);

        const iframe = $('#' + quill_iframe_id).get(0);
        const iframe_quill = iframe.contentDocument || iframe.contentWindow.document;
        const iframe_content = example_quill_iframe.replace('%EDITOR_ID%', quill_id);

        iframe_quill.open();
        iframe_quill.write(iframe_content);
        iframe_quill.close();
        
        const Quill = iframe.contentWindow.Quill;

        const alignClass = Quill.import('attributors/style/align');
        const backgroundClass = Quill.import('attributors/style/background');
        const colorClass = Quill.import('attributors/style/color');
        const fontClass = Quill.import('attributors/style/font');
        const SizeClass = Quill.import('attributors/style/size');

        SizeClass.whitelist = fontSizeArr;
        Quill.register(alignClass, true);
        Quill.register(backgroundClass, true);
        Quill.register(colorClass, true);
        Quill.register(fontClass, true);
        Quill.register(SizeClass, true);

        const quill = new Quill(iframe_quill.getElementById(quill_id), {
            modules: {
                toolbar: toolbarOptions
            },
            theme: 'snow',
        });

        const toolbar_height = $(iframe_quill).find('.ql-toolbar').innerHeight() + 2;
        const iframe_ep_content = $(iframe_quill).find('.ep-content');
        iframe_ep_content.css('height', 'calc(100% - '+toolbar_height+'px)');

        quill.clipboard.dangerouslyPasteHTML(textarea.val());
        quill.on('text-change', function() {
            console.log(quill.root.innerHTML);
        });
        
    });
});