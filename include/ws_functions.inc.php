<?php
if (!defined('PHPWG_ROOT_PATH')) die('Hacking attempt!');

function ep_get_accept_data()
{
  // These are all items that can be activated in quill
  $accept_data = [
    'button/ql-bold',
    'button/ql-italic',
    'button/ql-underline',
    'button/ql-strike',
    'button/ql-blockquote',
    'button/ql-header',
    'button/ql-list',
    'button/ql-script',
    'button/ql-indent',
    'button/ql-direction',
    'span/ql-size',
    'span/ql-header',
    'span/ql-color',
    'span/ql-background',
    'span/ql-font',
    'span/ql-align',
    'button/ql-link',
    'button/ql-image',
    'button/ql-video',
    'button/ql-clean',
  ];

  return array_flip($accept_data);
}

function ep_quill_add_methods($arr)
{
  global $conf;
  $service = &$arr[0];

  $service->addMethod(
    'ep.setConfig',
    'ep_set_config',
    array(
      'editor' => array(
        'info' => 'Choose an editor : `quill` or `ckeditor`',
      ),
      'config_quill' => array(
        'default'=>null,
        'flags' => WS_PARAM_FORCE_ARRAY, WS_PARAM_OPTIONAL,
        'info' => 'Must be an array like',
      ),
    ),
    'Accepted values for <code>config_quill</code> parameter: <ul><li>' . join('</li><li> ', array_keys(ep_get_accept_data())) . '</li></ul>',
    null,
    array(
      'hidden' => false,
      'admin_only' => true,
      'post_only' => true,
    )
  );
}

function ep_set_config($params)
{
  $accept_data = ep_get_accept_data();
  $old_ep_config = safe_unserialize(conf_get_param('editorplus'));
  $ep_config = array(
    'config_quill' => $old_ep_config['config_quill'],
  );

  // Save editor
  if (!preg_match('/^(quill)$|^(ckeditor)$/', $params['editor']))
  {
    return array(
      'status' => 'error',
      'message' => 'Configuration not saved! Not validated data for editor.',
    );
  }

  $ep_config['editor'] = $params['editor'];

  // Save quill configuration
  if (count($params['config_quill']) > 0)
  {
    foreach ($params['config_quill'] as $item)
    {
      if (!isset($accept_data[$item]))
      {
        return array(
          'status' => 'error',
          'message' => 'Configuration not saved! Not validated data : ' . $item,
        );
      }
    }

    $ep_config['config_quill'] = $params['config_quill'];
  }

  conf_update_param('editorplus', $ep_config, true);
  $ep_config = safe_unserialize(conf_get_param('editorplus'));

  return array(
    'status' => 'success',
    'message' => 'The configuration has been successfully saved.',
    'configuration' => $ep_config,
  );
}
