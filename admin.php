<?php
if (!defined("PHPWG_ROOT_PATH")) die("Hacking attempt!");

global $page;

// Get current tab
$page["tab"] = isset($_GET["tab"]) ? $_GET["tab"] : $page["tab"] = "configuration";

// Create tabsheet
include_once(PHPWG_ROOT_PATH . "admin/include/tabsheet.class.php");
$tabsheet = new tabsheet();
$tabsheet->set_id("editorplus");
$tabsheet->add("configuration", '<span class="icon-cog"></span>Configuration', EP_ADMIN . "-configuration");
$tabsheet->add("playground", '<span class="icon-dice-solid"></span>Playground', EP_ADMIN . "-playground");
$tabsheet->select($page["tab"]);
$tabsheet->assign();

// Include pag tab
include(EP_PATH . "admin/" . $page["tab"] . ".php");

// Send page contet
$template->assign(array(
    "EP_PATH" => EP_PATH,
    "EP_REALPATH" => EP_REALPATH,
    "EP_ADMIN" => EP_ADMIN
));
$template->assign_var_from_handle("ADMIN_CONTENT", "editorplus_content");
