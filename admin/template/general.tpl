{combine_css path="{$EP_PATH}admin/css/plugin.css" order=0}
<section class="ep-container">
    <h2>EditorPlus - General</h2>
    <div>
        <h3>EditorPlus &#x1F3A8;</h3>
        <p>WYSIWYG Editor for Piwigo.</p>
    </div>
    <div class="ep-config">
        <h4> &#x1F6E0; Configuration :</h4>
        {if file_exists("{$EP_REALPATH}/admin/template/config_{$EP_EDITOR}.tpl")}
            {include file="{$EP_REALPATH}/admin/template/config_{$EP_EDITOR}.tpl"}
        {else}
            <p>This WYSIWYG doesn't have configuration</p>
        {/if}
    </div>
</section>