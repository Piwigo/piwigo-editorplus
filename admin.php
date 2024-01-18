<?php
if (!defined('PHPWG_ROOT_PATH')) die('Hacking attempt!');

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
$template->set_filename('editorplus_content', EP_REALPATH . '/admin/template/configuration.tpl');
$template->assign_var_from_handle('ADMIN_CONTENT', 'editorplus_content');
