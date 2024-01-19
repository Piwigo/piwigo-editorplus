// +-----------------------------------------------------------------------+
// | EditorPlus : Quill  Configuration                                     |
// |                                                                       |
// | Eeverything concerning javascript quill configuration is written      |
// | in this file.                                                         |
// | The file is divided into two parts:                                   |
// |  - Definition of functions                                            |
// |  - Display script                                                     |
// +-----------------------------------------------------------------------+

// +-----------------------------------------------------------------------+
// | Definition of functions                                               |
// +-----------------------------------------------------------------------+
/**
 * `EditorPlus - Configuration Quill` : init Drag and Drop
 * 
 * init Drag and Drop for quill items.
 */
function drag_and_drop(state) {
    if (state !== 'init') {
        $('#quill_items').sortable('destroy');
    }
    let count = 0;
    let items_quill = [];
    $('#toolbar-drop .config-quill-badge').each(function() {
        count += $(this).data('length');
        items_quill.push($(this).data('quill'));
    });
    check_drag(count);
}

/**
 * `EditorPlus - Configuration Quill` : Check Drag and Drop
 * 
 * Disables badges when badge value reaches or approaches 12.
 */
function check_drag(count) {
    let filter = '';
    const config_1 = $('#quill_items .config-quill-badge[data-length="1"]');
    const config_2 = $('#quill_items .config-quill-badge[data-length="2"]');
    const config_3 = $('#quill_items .config-quill-badge[data-length="3"]');
    const config_all = $('#quill_items .config-quill-badge');
    if (count >= 8) {
        config_3.addClass('not-sortable');
        config_2.removeClass('not-sortable');
        config_1.removeClass('not-sortable');
        filter = '.config-quill-badge:not(.not-sortable)';
    }
    if (count >= 9) {
        config_2.addClass('not-sortable');
        config_1.removeClass('not-sortable');
        filter = '.config-quill-badge:not(.not-sortable)';
    }
    if(count >= 10){
        config_all.addClass('not-sortable');
        filter = '.config-quill-badge:not(.not-sortable)';
    }
    if (count <= 7) {
        config_all.removeClass('not-sortable');
        filter = '.config-quill-badge';
    }

    $('#quill_items').sortable({
        connectWith: '.dropzone',
        items: filter,
        placeholder: 'placeholder',
        revert: true,
        stop: function (event, ui) {
            drag_and_drop('reset');
        },
    }).disableSelection();
}

/**
 * `EditorPlus - Configuration Quill` : Show status message
 * 
 * Displays status message during 5 seconds
 */
function show_message_quill(status, message){
    const id_msg = $('#message_status');
    const msg_class = status == 'success' ? 'info-message icon-ok' : 'info-error icon-cancel';
    
    id_msg.removeClass()
    id_msg.addClass(msg_class);
    id_msg.html(message);
    id_msg.fadeIn();

    setTimeout(function() {
        id_msg.fadeOut()
    }, 5000);
}

// +-----------------------------------------------------------------------+
// | Display script                                                        |
// +-----------------------------------------------------------------------+
$(document).ready(function () {
    EP_CONFIG_EDITOR.config_quill.forEach(function(item) {
        $('#quill_items .config-quill-badge[data-quill="' + item + '"]').appendTo('#toolbar-drop');
    });

    drag_and_drop('init');

    $('#toolbar-drop').sortable({
        connectWith: '.dropzone',
        items: '.config-quill-badge',
        placeholder: 'placeholder',
        revert: true,
        stop: function (event, ui) {
            drag_and_drop('reset');
        },
    }).disableSelection();

    $('#quill_items, #toolbar-drop').droppable({
        accept: '.config-quill-badge',
    });

    $('.icon-helper').on('click', function() {
        $('#helper-quill-modal').fadeIn();
    });

    $('.helper-quill-close').on('click', function() {
        $('#helper-quill-modal').fadeOut();
    });

    $('#save').on('click', function() {
        let data_quill = [];
        $('#toolbar-drop .config-quill-badge').each(function() {
            data_quill.push($(this).data('quill'));
        });

        $.ajax({
            url: 'ws.php?format=json&method=ep.setConfig',
            type: 'POST',
            data: {
                config_quill: data_quill,
            },
            dataType: 'json',
            success: function(res) {
                const result = res.result;
                const iframe_ql = $('[id^="ep-playground-quill"]').get(0);
                const iframe_dom_ql = iframe_ql.contentDocument || iframe_ql.contentWindow.document;
                
                if (result.status == 'success') {
                    EP_CONFIG_EDITOR.config_quill = result.data;
                }

                drag_and_drop('reset');
                toggle_toolbar(iframe_dom_ql);
                show_message_quill(result.status, result.message);
            },
            error: function(err) {
                console.error(err);
                show_message_quill('error', 'An error has occurred, please contact the Piwigo team by copying your console.log');
            }
        });

    });

    $('.load-quill').hide();
    $('.config-quill-container').fadeIn();
});