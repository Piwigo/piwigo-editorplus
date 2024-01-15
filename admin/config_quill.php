<?php
if (!defined("PHPWG_ROOT_PATH")) die("Hacking attempt!");

if (is_webmaster())
{
    global $template, $conf;
    $accept_data = ["button/ql-bold", "button/ql-italic", "button/ql-underline", "button/ql-strike", "button/ql-blockquote", "button/ql-code-block", "button/ql-header", "button/ql-list", "button/ql-script", "button/ql-indent", "button/ql-direction", "span/ql-size", "span/ql-header", "span/ql-color", "span/ql-background", "span/ql-font", "span/ql-align", "button/ql-link", "button/ql-image", "button/ql-video", "button/ql-clean"];

    if (isset($_POST["config"]))
    {
        $is_valid = true;
        $config = $_POST["config"];

        foreach($config as $item)
        {
            if (!in_array($item, $accept_data))
            {
                $is_valid = false;
                break;
            }
        }

        if ($is_valid)
        {
            $conf["editorplus"] = array(
                "editor" => "quill",
                "config_quill" => $config,
            );
            conf_update_param("editorplus", $conf["editorplus"]);
            $response = array(
                "status" => "success",
                "message" => "The configuration has been successfully saved.",
                "data" => $config,
            );
            echo json_encode($response);
            exit;
        }
        else
        {
            $response = array(
                "status" => "error",
                "message" => "Configuration not saved!",
            );
            echo json_encode($response);
            exit;
        }
    }

    $template->assign(array(
        "EP_CONFIG" => unserialize($conf["editorplus"]),
    ));
}