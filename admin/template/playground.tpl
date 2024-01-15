{combine_css path="{$EP_PATH}admin/css/plugin.css" order=0}
<fieldset class="ep-fieldset">
    <h2>EditorPlus</h2>
    <p>This is what the editor looks like throughout Piwigo.</p>
    <p>Here you can play with it and see its features</p>
    <div class="ep-content">
        <textarea id="ep-playground" rows="5" cols="33">
            <strong>Hello World! </strong> 
            <p>Type something here</p> 
        </textarea>
        <button id="result_button"> Preview </button>
        <div id="result_ep"></div>
    </div>
</fieldset>