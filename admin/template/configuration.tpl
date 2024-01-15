{combine_css path="{$EP_PATH}admin/css/plugin.css" order=0}
<section class="ep-container">
    <h2>EditorPlus</h2>
    <div class="ep-config">
        {if file_exists("{$EP_REALPATH}/admin/template/config_{$EP_EDITOR}.tpl")}
            {include file="{$EP_REALPATH}/admin/template/config_{$EP_EDITOR}.tpl"}
        {else}
            <p>This WYSIWYG doesn't have configuration</p>
        {/if}
    </div>
</section>