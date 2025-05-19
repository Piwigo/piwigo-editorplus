<?php
if (!defined('PHPWG_ROOT_PATH')) die('Hacking attempt!');

// +-----------------------------------------------------------------------+
// | Check Access and exit when user status is not ok                      |
// +-----------------------------------------------------------------------+
check_status(ACCESS_WEBMASTER);

global $page, $conf;

// Get current tab
$page['tab'] = 'configuration';

// Create tabsheet
include_once(PHPWG_ROOT_PATH . 'admin/include/tabsheet.class.php');
$tabsheet = new tabsheet();
$tabsheet->set_id('editorplus');
$tabsheet->add('configuration', '<span class="icon-cog"></span>Configuration', EP_ADMIN . '-configuration');
$tabsheet->select($page['tab']);
$tabsheet->assign();

// Configuration page php variable
$template->assign(array(
    'EP_PATH' => EP_PATH,
    'EP_REALPATH' => EP_REALPATH,
    'EP_ADMIN' => EP_ADMIN,
));

// Send template content
$template_path = $conf['allow_html_descriptions'] ? '/admin/template/configuration.tpl' : '/admin/template/editorplus_wrong.tpl';
$template->set_filename('editorplus_content', EP_REALPATH . $template_path);
$template->assign_var_from_handle('ADMIN_CONTENT', 'editorplus_content');
