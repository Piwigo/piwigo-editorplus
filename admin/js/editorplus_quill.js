// +-----------------------------------------------------------------------+
// | EditorPlus : Quill                                                    |
// |                                                                       |
// | To avoid a large number of files, everything concerning quill editor  |
// | is written in this file.                                              |
// | Uppercase constants are defined in editorplus_quill.tpl.              |
// | The file is divided into three parts:                                 |
// |  - Definition of constants                                            |
// |  - Definition of functions                                            |
// |  - Display script                                                     |
// +-----------------------------------------------------------------------+


// +-----------------------------------------------------------------------+
// | Definition of constants                                               |
// +-----------------------------------------------------------------------+
// Toolbar options
const fontSizeArr = [false, '8px', '9px', '10px', '12px', '14px', '16px', '18px', '20px', '24px', '32px', '42px', '54px', '68px', '84px', '98px'];
const toolbarOptionFull = [
    ['bold', 'italic', 'underline', 'strike'],
    ['blockquote', 'code-block'],
    [{ 'header': 1 }, { 'header': 2 }],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    [{ 'script': 'sub' }, { 'script': 'super' }],
    [{ 'indent': '-1' }, { 'indent': '+1' }],
    [{ 'direction': 'rtl' }],
    [{ 'size': fontSizeArr}],
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    [{ 'color': [] }, { 'background': [] }],
    [{ 'font': [] }],
    [{ 'align': [] }],
    ['link', 'image', 'video'],
    ['clean']
];

const toolbarOption = [
    ['bold'],
    ['italic'],
    ['underline'],
    ['strike'],
    ['blockquote'],
    ['code-block'],
    [{ 'header': 1 }, { 'header': 2 }],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    [{ 'script': 'sub' }, { 'script': 'super' }],
    [{ 'indent': '-1' }, { 'indent': '+1' }],
    [{ 'direction': 'rtl' }],
    [{ 'size': fontSizeArr}],
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    [{ 'color': [] }],
    [{ 'background': [] }],
    [{ 'font': [] }],
    [{ 'align': [] }],
    ['link'],
    ['image'],
    ['video'],
    ['clean']
];

// Editor container template
const example_quill_container = `
<div id="%CONTAINER_ID%" style="width:100%">
    <iframe name="%QUILL_IFRAME_ID%" id="%QUILL_IFRAME_ID%" style="width:100%;height:%TEXTAREA_HEIGHT%" frameborder="0">
    </iframe>
</div>
`;

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
            margin-right: 0px !important;
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

        window.addEventListener("keyup", (e) => {
            if (e.key === 'Escape') {
                const keyupMessageType = "iframeKeyup_" + "%EDITOR_ID%";
                window.parent.postMessage({ type: keyupMessageType }, '*');
            }
        });
    };
</` + `script>
</html>`;

// Toolbar fullscreen button template
const example_fullscreen_button = `
<span class="ql-formats icon-resize-full ep-icon" data-modal="inactive"></span>
`;

// +-----------------------------------------------------------------------+
// | Definition of functions                                               |
// +-----------------------------------------------------------------------+

/**
 * `EditorPlus - Quill` : Creates the editor iframe and displays it on the page.
 * 
 *  Hides the textarea and displays in its place an iframe that loads the Quill editor.
 * @param textarea the textarea jquery object
 * @returns quill_id, Quill, iframe_dom, quill
 */
function create_iframe_quill(textarea) {
    try {
        // Define iframe container constante
        const quill_id = textarea.attr('id') ? textarea.attr('id') + '-quill' : textarea.attr('name') + '-quill';
        const unique_iframe = new Date().getTime();  // Each time the page is loaded, we assign a new id to the iframe. This trick allows Safari not to cache the iframe (which causes problems).
        const quill_iframe_id = quill_id + '-iframe' + unique_iframe;
        const textarea_height = textarea.innerHeight() + 150; // + 150 is a good size for editor content
        const quill_iframe = example_quill_container
        .replace(/%CONTAINER_ID%/g, 'container-' + quill_iframe_id)
        .replace(/%QUILL_IFRAME_ID%/g, quill_iframe_id)
        .replace(/%TEXTAREA_HEIGHT%/g, textarea_height + 'px');

        // Hide textarea and display our editor
        textarea.hide();
        textarea.after(quill_iframe);

        // Define iframe content constante
        const iframe = $('#' + quill_iframe_id).get(0);
        const iframe_dom = iframe.contentDocument || iframe.contentWindow.document; // For older browsers because they don't support "iframe.contentDocument".
        const iframe_content = example_quill_iframe
        .replace(/%EDITOR_ID%/g, quill_id)
        .replace(/%EP_PATH%/g, EP_PATH);

        // Fill iframe content
        iframe_dom.open();
        iframe_dom.write(iframe_content);
        iframe_dom.close();

        // Return quill_id and Quill
        return {
            quill_id: quill_id,
            iframe_dom: iframe_dom,
            quill: $(iframe_dom),
            iframe_id: quill_iframe_id,
        }
    } catch (err) {
        console.error('Unable to create iframe', err);
    }
}

/**
 * `EditorPlus - Quill` : Init and load quill editor in iframe
 * 
 * Setup quill with some config and add an expand/shrink button in toolbar
 * @param {*} Quill Quill v2
 * @param {*} iframe_dom iframe DOM Content
 * @param {*} quill_id quill_id div
 * @param {*} quill quill div jquery object
 * @returns Quill, expand
 */
function load_quill(Quill, iframe_dom, quill_id, quill) {
    try {
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

        // Quill initialization
        const quill_init = new Quill(iframe_dom.getElementById(quill_id), { // we use getElementById because for quill its better
            modules: {
                toolbar: toolbarOption,
            },
            theme: 'snow',
        });

        // Add expand/shrink button and resize toolbar
        const toolbar = quill.find('.ql-toolbar');
        toolbar.append(example_fullscreen_button);
        const iframe_ep_content = quill.find('.ep-content');
        const toolbar_expand_button = toolbar.find('.ep-icon');

        // Minify toolbar
        toolbar.find('.ql-formats:not(.ep-icon)').hide();
        EP_CONFIG_QUILL.config_quill.slice().reverse().forEach(function(item) {
            const type_item = item.split('/')[0];
            const quill_item = item.split('/')[1];
            let new_toolbar = toolbar.find(type_item + '.' + quill_item).parent();
            new_toolbar.show();
            toolbar.prepend(new_toolbar);
        });

        return {
            Quill: quill_init,
            expand: toolbar_expand_button,
        }
    } catch (err) {
        console.error('Unable to load quill', err);
    }
}

/**
 * `EditorPlus - Quill` : Show quill modal
 */
function show_quill_modal(quill_iframe_id, expand_button) {
    try {
        $('#container-' + quill_iframe_id).addClass('quill-modal-content');
        $('#' + quill_iframe_id).addClass('quill-modal-iframe');
        expand_button.removeClass('icon-resize-full');
        expand_button.addClass('icon-resize-small');
        expand_button.data('modal', 'active');
    } catch (err) {
        console.error('Unable to show quill modal', err);
    }
}

/**
 * `EditorPlus - Quill` : Close quill modal
 */
function close_quill_modal(quill_iframe_id, expand_button) {
    try {
        $('#container-' + quill_iframe_id).removeClass('quill-modal-content');
        $('#' + quill_iframe_id).removeClass('quill-modal-iframe');
        expand_button.removeClass('icon-resize-small');
        expand_button.addClass('icon-resize-full');
        expand_button.data('modal', 'inactive');
    } catch (err) {
        console.error('Unable to close modal', err);
    }
}

/**
 * `EditorPlus - Quill` : Toggle Toolbar
 */
function toggle_toolbar() {

}

/**
 * `EditorPlus - Quill` : Convert quill class to inline style
 * @param {*} text raw quill root content
 * @returns convert quill content
 */
function convert_quill(text) {
    // Convert class 'ql-indent-*' to inline style
    $(text).find('[class^="ql-indent-"]').each(function() {
        const e = $(this);
        const c = e[0].className;
        const i = c.match(/\d+$/)[0];
        e.removeClass(c);
        // e.removeAttr('class');
        e.css('padding-left', i*3 + 'em');
    });
    // Convert class 'ql-code-block-container' to inline style
    $(text).find('.ql-code-block-container').each(function() {
        const e = $(this);
        const c = e[0].className;
        e.css({
            'background-color' : '#23241f',
            'color' : '#f8f8f2',
            'overflow' : 'visible',
            'margin-bottom' : '5px',
            'margin-top' : '5px',
            'padding' : '5px 10px',
            'border-radius' : '3px',
            'font-family' : 'monospace',
            'position' : 'relative',
        });
        e.removeClass(c);
        e.find('.ql-code-block').removeClass('ql-code-block');
    });
    // Convert class 'ql-ui' to inline style
    $(text).find('.ql-ui').each(function() {
        const e = $(this);
        e.remove();
    });
    // Convert class 'ql-video' to inline style
    $(text).find('.ql-video').each(function() {
        const e = $(this);
        e.removeClass('ql-video');
        e.css({
            'display' : 'block',
            'max-width' : '100%'
        });
    });

    return text;
}

// +-----------------------------------------------------------------------+
// | Display script                                                        |
// +-----------------------------------------------------------------------+

// We load the editor
// Waiting for DOM before load our script
$(document).ready(function () {
    // For each `EX_TEXTAREA` (textarea ids), we'll check whether we've found a textarea with these ids
    // `EP_TEXTAREA` is define in editorplus_quill.tpl
    $.each(EP_TEXTAREA, function (i, id) {
        // Get textarea
        const textarea = $('#' + id);

        // This is the most important part of our script, we load the editor
        if (textarea.length > 0 && textarea.is('textarea')) {

            // On the album page, we remove the expand button from the description to leave the EditorPlus one
            if (EP_CURRENT_PAGE == 'album') { $('#desc-zoom-square').css('display', 'none'); }
            // create iframe
            const iframe = create_iframe_quill(textarea);

            // We use an "addEventListener" which is triggered when the iframe dom is loaded and not "iframe.onload", 
            // because Safari handles onload differently.
            // Safari loads the editor only once and on only one page per session.
            window.addEventListener('message', function (e) {
                // For security we check if the iframe have the same origin as piwigo server
                if (e.origin !== window.location.origin) return;

                // Iframe onload
                if (e.data.type === 'iframeLoaded_' + iframe.quill_id) { // This is generate in example_quill_iframe
                    // Init and load quill
                    const loaded_quill = $('#' + iframe.iframe_id).get(0).contentWindow.Quill;
                    const quill = load_quill(loaded_quill, iframe.iframe_dom, iframe.quill_id, iframe.quill);

                    // Fill quill editor with textarea value
                    quill.Quill.clipboard.dangerouslyPasteHTML(textarea.val());

                    // addEventListener
                    // Show/Hide quill modal
                    quill.expand.on('click', function () {
                        if (quill.expand.data('modal') == 'inactive') {
                            show_quill_modal(iframe.iframe_id, quill.expand);
                           $(iframe.iframe_dom).find('.ql-formats').show();
                        } else {
                            close_quill_modal(iframe.iframe_id, quill.expand);
                            $(iframe.iframe_dom).find('.ql-formats:not(.ep-icon)').hide();
                            EP_CONFIG_QUILL.config_quill.slice().reverse().forEach(function(item) {
                                const type_item = item.split('/')[0];
                                const quill_item = item.split('/')[1];
                                let new_toolbar = $(iframe.iframe_dom).find(type_item + '.' + quill_item).parent();
                                new_toolbar.show();
                            });
                        }
                    });
                    // On window click hide the modal
                    $(window).on('click', function (e) {
                        if (e.target == $('#container-' + iframe.iframe_id)[0]) {
                            close_quill_modal(iframe.iframe_id, quill.expand);
                            $(iframe.iframe_dom).find('.ql-formats:not(.ep-icon)').hide();
                            EP_CONFIG_QUILL.config_quill.slice().reverse().forEach(function(item) {
                                const type_item = item.split('/')[0];
                                const quill_item = item.split('/')[1];
                                let new_toolbar = $(iframe.iframe_dom).find(type_item + '.' + quill_item).parent();
                                new_toolbar.show();
                            });
                        }
                    });
                    // On quill text-change we put his value in textarea
                    quill.Quill.on('text-change', function () {
                        console.log(quill.Quill.root.innerHTML);
                        textarea.val(quill.Quill.root.innerHTML);
                    });
                    // On textarea text change we fill the editor with textarea value
                    textarea.on('change', function () {
                        quill.Quill.clipboard.dangerouslyPasteHTML(textarea.val());
                    });
                    // Convert Quill Css Class to inline style with Juice
                    if (EP_SAVE && EP_SAVE.type == 'submit') {
                        console.log('je suis save par un submit');

                    } else {
                        console.log('je suis sois un appel ajax ou je nai pas de save');
                    }
                    // result button for playground !!!! transform this for preview in toolbar
                    $('#result_button').on('click', function () {
                        const quill_content = quill.Quill.root.cloneNode(true);
                        const cq = convert_quill(quill_content);
                        console.log(cq);
                        $('#result_ep').html(cq.innerHTML);
                    });

                }

                // Hide modal with escape key from iframe
                if (e.data.type === 'iframeKeyup_' + iframe.quill_id) {
                    const button = iframe.quill.find('.ep-icon'); // expand button in iframe
                    close_quill_modal(iframe.iframe_id, button);
                    $(iframe.iframe_dom).find('.ql-formats:not(.ep-icon)').hide();
                        EP_CONFIG_QUILL.config_quill.slice().reverse().forEach(function(item) {
                        const type_item = item.split('/')[0];
                        const quill_item = item.split('/')[1];
                        let new_toolbar = $(iframe.iframe_dom).find(type_item + '.' + quill_item).parent();
                        new_toolbar.show();
                    });
                }

            });
        }

    });
});