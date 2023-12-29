<?php
if (!defined('PHPWG_ROOT_PATH')) die('Hacking attempt!');

/**
 * `EditorPlus` : init function
 */
function ep_init()
{
    global $conf;
    if (!isset($conf['editorplus']))
    {
        $conf['editorplus'] = 'default';
    }
    // var_dump($conf['editorplus']);
}

/**
 * `EditorPlus` : Add an configuration page for this plugin
 */
function ep_admin_menu($menu)
{
    $menu[] = array(
        'NAME' => 'EditorPlus',
        'URL' => EP_ADMIN,
    );
    return $menu;
}

/**
 * `EditorPlus` : display template `editorplus.tpl` on every admin page
 */
function ep_display()
{
    global $template;
    $template->set_filename('editorplus', EP_REALPATH . '/admin/template/editorplus.tpl');
    $template->assign(array(
        'EP_PATH' => EP_PATH,
        'EP_REALPATH' => EP_REALPATH,
    ));
    $template->parse('editorplus');
}

?>