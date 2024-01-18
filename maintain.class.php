<?php
defined('PHPWG_ROOT_PATH') or die('Hacking attempt!');

class editorplus_maintain extends PluginMaintain
{
  private $default_conf = array(
    'editor' => 'quill',
    'config_quill' => [
      'button/ql-bold',
      'button/ql-italic',
      'button/ql-underline',
      'button/ql-strike',
      'button/ql-header',
      'span/ql-color',
      'span/ql-background',
      'span/ql-align',
      'button/ql-clean',
    ],
  );

  function __construct($plugin_id)
  {
    parent::__construct($plugin_id);
  }

  /**
   * Plugin install
   */
  function install($plugin_version, &$errors = array())
  {
    global $conf;

    if (empty($conf['editorplus']))
    {
      // add config quill in $conf
      conf_update_param('editorplus', $this->default_conf, true);
    }
  }

  /**
   * Plugin activate
   */
  function activate($plugin_version, &$errors = array())
  {
  }

  /**
   * Plugin deactivate
   */
  function deactivate()
  {
  }

  /**
   * Plugin update
   */
  function update($old_version, $new_version, &$errors = array())
  {
    $this->install($new_version, $errors);
  }

  /**
   * Plugin uninstallation
   */
  function uninstall()
  {
    // delete configuration
    conf_delete_param('editorplus');
  }

}
