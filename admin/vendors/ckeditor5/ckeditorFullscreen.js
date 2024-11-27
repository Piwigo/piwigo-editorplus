// +-----------------------------------------------------------------------+
// | EditorPlus : CKEditor FullScreen plugin                               |
// |                                                                       |
// | Everything concerning CKEditor FullScreen plugin is written           |
// | in this file.                                                         |
// | This CKEditor plugin was written by Piwigo Team.                      |
// +-----------------------------------------------------------------------+
import { Plugin, ButtonView } from './ckeditor5.js';

export default class FullScreen extends Plugin {
  #boundToggleFullScreenByClick;

  constructor(editor) {
    super(editor);
    this.configFullScreen = this.editor.config.get('selectorFullScreen');
    this.container = window.parent.document.getElementById(this.configFullScreen.container);
    this.iframe = window.parent.document.getElementById(this.configFullScreen.iframe);
    this.button = null;
    this.#boundToggleFullScreenByClick = this.#toggleFullScreenByClick.bind(this);
  }

  init() {
    const editor = this.editor;

    editor.ui.componentFactory.add('fullScreen', (locale) => {
      this.button = new ButtonView(locale);

      this.button.set({
        label: "FullScreen",
        withText: false,
        tooltip: true,
        isToggleable: true,
        class: "icon-resize-full",
      });

      this.button.on('execute', () => {
        if (!this.container || !this.iframe || !this.button) return;
        this.toggleFullScreen();
      });

      return this.button;
    });
  }

  toggleFullScreen() {
    if (this.container.classList.contains("ck-modal-content")) {
      this.#hideFullScreen();
      window.parent.window.removeEventListener('click', this.#boundToggleFullScreenByClick);
    } else {
      this.#showFullScreen();
      window.parent.window.addEventListener('click', this.#boundToggleFullScreenByClick);
    }
  }

  #toggleFullScreenByClick() {
    this.toggleFullScreen();
  }

  #showFullScreen() {
    this.button.set({
      class: "icon-resize-small",
    });
    this.iframe.classList.add('ck-modal-iframe');
    this.container.classList.add('ck-modal-content');
    if ('album' === this.configFullScreen.page)
    document.querySelector('.ck-toolbar__grouped-dropdown').classList.remove('hidden-button');
  }

  #hideFullScreen() {
    this.button.set({
      class: "icon-resize-full",
    });
    this.iframe.classList.remove('ck-modal-iframe');
    this.container.classList.remove('ck-modal-content');
    if ('album' === this.configFullScreen.page)
      document.querySelector('.ck-toolbar__grouped-dropdown').classList.add('hidden-button');
  }
}
