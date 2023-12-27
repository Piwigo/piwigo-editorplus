<?php
if (!defined('PHPWG_ROOT_PATH')) die('Hacking attempt!');

/**
 * admin configuration plugin
 */
function admin_menu($menu)
{
    $menu[] = array(
        'NAME' => 'EditorPlus',
        'URL' => EP_ADMIN,
    );
    return $menu;
}

?>