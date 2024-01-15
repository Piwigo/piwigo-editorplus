<?php
if (!defined("PHPWG_ROOT_PATH")) die("Hacking attempt!");

// load EditorPlus
add_event_handler("loc_begin_admin_page", "ep_load_editor");
