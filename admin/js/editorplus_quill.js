// Toolbar options
const fontSizeArr = [false, '8px', '9px', '10px', '12px', '14px', '16px', '18px', '20px', '24px', '32px', '42px', '54px', '68px', '84px', '98px'];
const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],
    [{ 'align': [] }],
    [{ 'color': [] }, { 'background': [] }],
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    [{ 'size': fontSizeArr }],
    [{ 'font': [] }],
    ['link', 'image', 'video', 'blockquote'],
    ['clean'],
];

// Iframe template
const example_quill_iframe = `
<html>
<head>
    <link href="%EP_PATH%node_modules/quill/dist/quill.snow.css" rel="stylesheet">
    <link href="admin/themes/default/fontello/css/fontello.css" rel="stylesheet">
    <style>
        body, html {
            margin: 0;
            padding: 0;
            height: 100%;
            width: 100%;
            background: white;
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
        .ql-formats {
            margin-right: 10px !important;
        }
        .ep-icon {
            cursor: pointer;
        }
        .ql-picker-options {
            height: calc(100% + 66px);
            overflow: auto;
        }
    </style>
    <script src="%EP_PATH%node_modules/quill/dist/quill.js"></` + `script>
</head>
<body>
    <div class="ep-content" id="%EDITOR_ID%"></div>
</body>
<script>
    window.onload = function() {
        const uniqueMessageType = "iframeLoaded_" + "%EDITOR_ID%"; 
        window.parent.postMessage({ type: uniqueMessageType }, '*');
    };
</` + `script>
</html>`;

// We load the editor
// Waiting for DOM before load our script
$(document).ready(function () {
    
    // For each `EX_TEXTAREA` (textarea ids), we'll check whether we've found a textarea with these ids
    $.each(EP_TEXTAREA, function(i, id) {
        console.log(id);
        const textarea = $('#' + id);

        // This is the most part of our script, we load the editor
        if (textarea.length > 0 && textarea.is('textarea')) {
            console.log(textarea);
            // On the album page, we remove the expand button from the description to leave the EditorPlus one
            if (EP_CURRENT_PAGE == 'album') { $('#desc-zoom-square').css('display', 'none'); }

            // Define iframe const
            const textarea_height = textarea.innerHeight() + 150; // 150 is a good size for editor content 
            const quill_id = textarea.attr('id') ? textarea.attr('id') : textarea.attr('name') + '-quill';
            const unique_iframe = new Date().getTime();  // Each time the page is loaded, we assign a new id to the iframe. This trick allows Safari not to cache the iframe (which causes problems).
            const quill_iframe_id = quill_id + '-iframe' + unique_iframe;
            const quill_iframe = '<div id="container-'+ quill_iframe_id +'" style="width:100%"><iframe name="' + quill_iframe_id + '" id="' + quill_iframe_id + '" style="width:100%;height:' + textarea_height + 'px" frameborder="0"></iframe></div>';
        
            // Hide textarea and display our editor (in iframe)
            textarea.hide();
            textarea.after(quill_iframe);

            // Fill iframe
            const iframe = $('#' + quill_iframe_id).get(0);
            const iframe_quill = iframe.contentDocument || iframe.contentWindow.document; // For older browsers because they don't support "iframe.contentDocument".
            const iframe_content = example_quill_iframe.replace(/%EDITOR_ID%/g, quill_id).replace(/%EP_PATH%/g, EP_PATH);

            iframe_quill.open();
            iframe_quill.write(iframe_content);
            iframe_quill.close();

            // We use an "addEventListener" which is triggered when the iframe dom is loaded and not "iframe.onload", 
            // because Safari handles onload differently.
            // Safari loads the editor only once and on only one page per session.
            window.addEventListener('message', function (event) {
                if (event.origin !== window.location.origin) return; // For security we check if the iframe have the same origin as piwigo server
                if (event.data.type === 'iframeLoaded_' + quill_id) { // This is generate in iframe template
                    const Quill = iframe.contentWindow.Quill;
    
                    // We need inline style and not Quill CSS Class
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
    
                    // Init Quill
                    const quill = new Quill(iframe_quill.getElementById(quill_id), { // we use getElementById because for quill its better
                        modules: {
                            toolbar: toolbarOptions,
                        },
                        theme: 'snow',
                    });
    
                    // Add expand/shrink button and resize toolbar
                    const i_quill = $(iframe_quill);
                    const toolbar = i_quill.find('.ql-toolbar');
                    const iframe_ep_content = i_quill.find('.ep-content');
                    const fullScreen_button = $('<span class="ql-formats icon-resize-full ep-icon" data-modal="inactive"></span>');
                    toolbar.append(fullScreen_button);
    
                    const toolbar_height = toolbar.innerHeight() + 2;
                    iframe_ep_content.css('height', 'calc(100% - ' + toolbar_height + 'px)');
    
                    // Script for expand/shrink button
                    toolbar.find('.ep-icon').on('click', function() {
                        if($(this).data('modal') == 'inactive') {
                            $('#container-' + quill_iframe_id).addClass('ep-modal-content');
                            $('#' + quill_iframe_id).addClass('ep-modal-iframe');
                            $(this).removeClass('icon-resize-full');
                            $(this).addClass('icon-resize-small');
                            $(this).data('modal', 'active');
                        } else {
                            $('#container-' + quill_iframe_id).removeClass('ep-modal-content');
                            $('#' + quill_iframe_id).removeClass('ep-modal-iframe');
                            $(this).removeClass('icon-resize-small');
                            $(this).addClass('icon-resize-full');
                            $(this).data('modal', 'inactive');
                        } 
                    });
    
                    // Quill and textarea value
                    quill.clipboard.dangerouslyPasteHTML(textarea.val()); // Fill editor content with textarea value
                    // On editor text change we fill the textarea with editor content
                    quill.on('text-change', function () {
                        textarea.val(quill.root.innerHTML);
                    });
                    // On textarea text change we fill the editor with textarea value
                    textarea.on('change', function() {
                        quill.clipboard.dangerouslyPasteHTML(textarea.val());
                        console.log('je passe ici');
                    });
                }
            });

        }

    });

});