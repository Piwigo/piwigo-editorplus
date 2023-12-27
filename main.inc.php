<?php
/*
Version: 1.0
Plugin Name: EditorPlus
Plugin URI: github link
Author: Piwigo team
Author URI: https://github.com/Piwigo
Description: WYSIWYG Editor for Piwigo. Using Quill.
*/

if (!defined('PHPWG_ROOT_PATH')) die('Hacking attempt!');

// +-----------------------------------------------------------------------+
// | Define plugin constants                                               |
// +-----------------------------------------------------------------------+

define('EP_ID', basename(dirname(__FILE__)));
define('EP_PATH', PHPWG_PLUGINS_PATH . EP_ID . '/');
define('EP_REALPATH', realpath(EP_PATH));
define('EP_ADMIN', get_root_url() . 'admin.php?page=plugin-' . EP_ID);

// +-----------------------------------------------------------------------+
// | Add event handlers                                                    |
// +-----------------------------------------------------------------------+

// init
// init here


if (defined('IN_ADMIN'))
{
    // admin handlers functions 
    $admin_file = EP_PATH . 'include/admin.inc.php';

    // admin menu link
    add_event_handler('get_admin_plugin_menu_links', 'admin_menu', EVENT_HANDLER_PRIORITY_NEUTRAL, $admin_file);

}

?>