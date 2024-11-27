<?php
if (!defined('PHPWG_ROOT_PATH')) die('Hacking attempt!');

/**
 * `EditorPlus` : plugin init function
 */
function ep_init()
{
    global $conf;

    // prepare plugin configuration
    $conf['editorplus'] = safe_unserialize($conf['editorplus']);
    load_language('plugin.lang', EP_PATH);
}

/**
 * `EditorPlus` : display template `editorplus_{$editor}.tpl` on every defined admin pages
 * @param array $textarea textarea ids
 * @param string $editor the editor to load
 * @return void assign variable and set editor template
 */
function ep_display($textarea, $editor, $current_page)
{
    global $template, $conf, $user;

    // set template and assign variable
    $template->set_filename('editorplus', EP_REALPATH . '/admin/template/editorplus_' . $editor . '.tpl');
    $template->assign(array(
        'EP_PATH' => EP_PATH,
        'EP_REALPATH' => EP_REALPATH,
        'EP_TEXTAREA_ID' => $textarea,
        'EP_EDITOR' => $editor,
        'EP_PAGE' => $current_page,
        'EP_CONFIG_EDITOR' => $conf['editorplus'],
        'EP_USER_LANGUAGE' => $user['language']
    ));
    $template->parse('editorplus');
}

/**
 * `EditorPlus` : Load editor in defined admin pages.
 *  For security reasons, we define in advance the textarea ids that will load the editor.
 */
function ep_load_editor()
{
    global $page, $conf;

    // If we dont have `$page` we cannot load the editor 
    if (!isset($page['page'])) return;

    // Choosen editor
    $editor = $conf['editorplus']['editor'];

    // Here we define the pages that will load the EditorPlus plugin and the textarea id 
    $textarea = array();
    $display = false;
    
    switch ($page['page'])
    {
        case 'album':
            $textarea[] = 'cat-comment';
            $display = true;
            break;

        case 'photo':
            $textarea[] = 'description';
            $display = true;
            break;

        case 'configuration':
            $textarea[] = 'page_banner';
            $display = true;
            break;

        case 'plugin':
            // If we dont have `$_GET['section']` we cannot load the editor 
            if (!isset($_GET['section'])) break;
            switch ($_GET['section']) 
            {
                // Define `EditorPlus` plugin
                case EP_ID . '/admin.php':
                    $textarea = ['ep-playground', 'ep-playground-ckeditor'];
                    $display = true;
                    $editor = 'config';
                    break;

                // Define `Additional pages` plugin
                case 'AdditionalPages/admin.php':
                    $textarea[] = 'ap_content';
                    $display = true;
                    break;

                // Define `Personal About` plugin
                case 'PersoAbout/admin.php':
                    $textarea[] = 'perso_about';
                    $display = true;
                    break;
                case 'PersoFooter/admin.php':
                    $textarea[] = 'perso_footer';
                    $display = true;
                    break;
                case 'Admin_Messages/admin.php':
                    $textarea[] = 'admin_message';
                    $display = true;
                    break;

                // Define `PWG Stuffs` plugin
                case 'PWG_Stuffs/admin.php':
                    $textarea[] = 'textarea';
                    $display = true;
                    break;

                default:
                    $display = false;
                    break;
            }
            break;

        default:
            $display = false;
            break;
    }

    // Ready to display our editor in defined admin pages
    if($display)
    {
        ep_display($textarea, $editor, $page['page']);
    }

}