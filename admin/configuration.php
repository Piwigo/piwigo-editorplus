<?php
if (!defined("PHPWG_ROOT_PATH")) die("Hacking attempt!");

$template->set_filename("editorplus_content", EP_REALPATH . "/admin/template/configuration.tpl");

// Include the config editor php file
global $conf;
$current_editor = unserialize($conf["editorplus"])["editor"];
if (file_exists(EP_PATH . "admin/config_" . $current_editor . ".php"))
{
    include(EP_PATH . "admin/config_" . $current_editor . ".php");
}