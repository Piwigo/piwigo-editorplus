<?php
if (!defined('PHPWG_ROOT_PATH')) die('Hacking attempt!');

function ep_get_accept_data()
{
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
      'config_quill' => array(
        'flags' => WS_PARAM_FORCE_ARRAY,
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

  $ep_config = array(
    'editor' => 'quill',
    'config_quill' => $params['config_quill'],
  );
  conf_update_param('editorplus', $ep_config, true);
  $ep_config = safe_unserialize(conf_get_param('editorplus'));

  return array(
    'status' => 'success',
    'message' => 'The configuration has been successfully saved.',
    'data' => $ep_config['config_quill'],
  );
}
