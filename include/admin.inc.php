<?php
if (!defined("PHPWG_ROOT_PATH")) die("Hacking attempt!");

/**
 * `EditorPlus` : plugin init function
 */
function ep_init()
{
    global $conf;

    if (!isset($conf["editorplus"])) {
        $conf["editorplus"] = array(
            "editor" => "quill",
            "config_quill" => [
                "button/ql-bold",
                "button/ql-italic",
                "button/ql-underline",
                "button/ql-strike",
                "button/ql-header",
                "button/ql-list",
                "span/ql-color",
                "span/ql-background",
                "span/ql-align",
                "button/ql-clean",
            ],
        );
        conf_update_param("editorplus", $conf["editorplus"]);
    }
}

/**
 * `EditorPlus` : display template `editorplus_{$editor}.tpl` on every defined admin pages
 * @param array $textarea textarea ids
 * @param string $editor the editor to load
 * @return void assign variable and set editor template
 */
function ep_display($textarea, $editor, $current_page)
{
    global $template, $conf;

    $template->set_filename("editorplus", EP_REALPATH . "/admin/template/editorplus_" . $editor . ".tpl");
    $template->assign(array(
        "EP_PATH" => EP_PATH,
        "EP_REALPATH" => EP_REALPATH,
        "EP_TEXTAREA_ID" => $textarea,
        "EP_EDITOR" => $editor,
        "EP_PAGE" => $current_page,
        "EP_CONFIG_EDITOR" => unserialize($conf["editorplus"]),
    ));
    $template->parse("editorplus");
}

/**
 * `EditorPlus` : Load editor in defined admin pages.
 *  For security reasons, we define in advance the textarea ids that will load the editor.
 */
function ep_load_editor()
{
    global $page;

    // If we dont have `$page` we cannot load the editor 
    if (!isset($page["page"])) return;

    // For later if we want to add an another WYSIWYG we did it here
    $editor = "quill";

    // Here we define the pages that will load the EditorPlus plugin and the textarea id 
    $textarea = array();
    $display = false;
    
    switch ($page["page"])
    {
        case "album":
            $textarea[] = "cat-comment";
            $display = true;
            break;

        case "photo":
            $textarea[] = "description";
            $display = true;
            break;

        case "configuration":
            $textarea[] = "page_banner";
            $display = true;
            break;

        case "plugin":
            // If we dont have `$_GET["section"]` we cannot load the editor 
            if (!isset($_GET["section"])) break;
            switch ($_GET["section"]) 
            {
                // Define `EditorPlus` plugin
                case "EditorPlus/admin.php":
                    $textarea[] = "ep-playground";
                    $display = true;
                    break;

                // Define `Additional pages` plugin
                case "AdditionalPages/admin.php":
                    $textarea[] = "ap_content";
                    $display = true;
                    break;

                // Define `Personal About` plugin
                case "PersoAbout/admin.php":
                    $textarea[] = "perso_about";
                    $display = true;
                    break;
                case "PersoFooter/admin.php":
                    $textarea[] = "perso_footer";
                    $display = true;
                    break;
                case "Admin_Messages/admin.php":
                    $textarea[] = "admin_message";
                    $display = true;
                    break;

                // Define `PWG Stuffs` plugin
                case "PWG_Stuffs/admin.php":
                    $textarea[] = "textarea";
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
        ep_display($textarea, $editor, $page["page"]);
    }

}