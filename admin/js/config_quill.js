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
    const id_msg_icon = $('#message_status_icon');
    const id_msg_content = $('#message_status_content');
    const class_msg = status === 'success' ? 'success-msg' : status === 'error' ? 'error-msg' : 'quill-msg';
    const icon_msg = status === 'success' ? 'icon-ok' : status === 'error' ? 'icon-cancel' : 'icon-info-circled-1';
    
    id_msg_icon.addClass(icon_msg);
    id_msg_content.text(message);
    id_msg.addClass(class_msg).fadeIn();

    setTimeout(function() {
        id_msg.fadeOut()
    }, 3000);
}

// +-----------------------------------------------------------------------+
// | Display script                                                        |
// +-----------------------------------------------------------------------+
$(document).ready(function () {
    EP_CONFIG.config_quill.forEach(function(item) {
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

    $('#save').on('click', function() {
        let data_quill = [];
        $('#toolbar-drop .config-quill-badge').each(function() {
            data_quill.push($(this).data('quill'));
        });
        
        $.ajax({
            type: 'POST',
            url: window.location.href,
            data: {
                config: data_quill,
            },
            dataType: 'json',
            success: function(res) {
                EP_CONFIG.config_quill = res.data;
                drag_and_drop('reset');
                show_message_quill(res.status, res.message);
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