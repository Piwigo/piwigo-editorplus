import {
  ClassicEditor,
  Autosave,
  AutoLink,
  Essentials,
  FindAndReplace,
  SourceEditing,
  // basics
  Bold,
  Italic,
  Strikethrough,
  Subscript,
  Superscript,
  Underline,
  // block
  BlockQuote,
  Code,
  Indent,
  IndentBlock,
  Link,
  Image,
  ImageInsert,
  LinkImage,
  ImageEditing,
  ImageBlockEditing,
  MediaEmbed,
  // fonts
  FontBackgroundColor,
  FontColor,
  FontSize,
  FontFamily,
  Highlight,
  // paragraph
  Heading,
  List,
  Table,
  TableToolbar,
  ShowBlocks,
  SpecialCharacters,
  SpecialCharactersEssentials,
  // line
  HorizontalLine,
  // html support
  GeneralHtmlSupport,
  HtmlComment,
  // Clean
  RemoveFormat
} from "./ckeditor5.js";

import FullScreen from "./ckeditorFullscreen.js";
import { convertValueCKEditor } from "../../js/editorplus_functions.js";

const epLang = EP_USER_LANGUAGE.split('_')[0] ?? 'en';
let coreTranslations;

import(`./translations/${epLang}.js`).then(cT => {
  coreTranslations = cT.default;
})
  .catch(async () => {
    const defaultCT = await import('./translations/en-gb.js');
    coreTranslations = defaultCT.default;
    console.log('Load default language..');
  }).finally(() => {
    epInitCKEditor(coreTranslations);
  });

function epInitCKEditor(cT) {
  ClassicEditor.create(document.querySelector(`#${EP_TEXTAREA_CKEDITOR}`), {
    language: {
      ui: epLang,
      content: epLang
    },
    plugins: [
      Autosave,
      AutoLink,
      Essentials,
      FindAndReplace,
      FullScreen,
      SourceEditing,
      // basics
      Bold,
      Code,
      Italic,
      Strikethrough,
      Subscript,
      Superscript,
      Underline,
      // block
      BlockQuote,
      Indent,
      IndentBlock,
      Link,
      Image,
      ImageInsert,
      // LinkImage,
      ImageEditing,
      ImageBlockEditing,
      MediaEmbed,
      // fonts
      FontBackgroundColor,
      FontColor,
      FontSize,
      FontFamily,
      Highlight,
      // paragraph
      Heading,
      List,
      Table,
      TableToolbar,
      ShowBlocks,
      SpecialCharacters,
      SpecialCharactersEssentials,
      // line
      HorizontalLine,
      // html support
      GeneralHtmlSupport,
      HtmlComment,
      // Clean
      RemoveFormat
    ],
    autosave: {
      waitingTime: 500,
      save(editor) {
        const ckData = convertValueCKEditor(editor.getData());
        window.parent.document.querySelector(`#${EP_TEXTAREA_CKEDITOR}`).innerHTML = ckData;
      }
    },
    toolbar: {
      items: [
        "undo",
        "redo",
        "fullscreen",
        "|",
        "fontFamily",
        "fontSize",
        "fontColor",
        "fontBackgroundColor",
        "|",
        "bold",
        "italic",
        "underline",
        "|",
        "heading",
        "|",
        "strikethrough",
        "subscript",
        "superscript",
        "code",
        "|",
        "insertTable",
        "link",
        "imageInsert",
        "blockQuote",
        "|",
        "bulletedList",
        "numberedList",
        "outdent",
        "indent",
        "|",
        "findAndReplace",
        "highlight",
        "horizontalLine",
        "mediaEmbed",
        "specialCharacters",
        "|",
        "showBlocks",
        "removeFormat",
        "sourceEditing",
      ],
      shouldNotGroupWhenFull: false,
    },
    image: {
      insert: {
        integrations: ['url']
      }
    },
    translations: [
      cT
    ],
    htmlSupport: {
      allow: [
        {
          name: /.*/,
          styles: true,
          attributes: true
        }
      ]
    },
    fontSize: {
      options: [
        { model: 'text-big', title: 'Big', view: { name: 'span', styles: { 'font-size': '1.4em' } } },
        'default',
        { model: 'text-small', title: 'Small', view: { name: 'span', styles: { 'font-size': '.85em' } } },
        { model: 'text-tiny', title: 'Tiny', view: { name: 'span', styles: { 'font-size': '.7em' } } }
      ]
    },
    highlight: {
      options: [
        {
          model: 'yellowMarker',
          class: '',
          title: 'Yellow marker',
          color: '#cac407',
          type: 'marker',
        },
      ]
    },
    mediaEmbed: {
      previewsInData: true
    },
    selectorFullScreen: {
      container: `ck-${EP_TEXTAREA_CKEDITOR}`,
      iframe: `ick-${EP_TEXTAREA_CKEDITOR}`,
      page: EP_CURRENT_PAGE ?? 'none',
    },
  }).then((editor) => {
    window.editor = editor;
    const element = editor.ui.view.element;
    if ("album" == EP_CURRENT_PAGE) {
      element.querySelector('.ck-toolbar__grouped-dropdown').classList.add('hidden-button');
    }
  }).catch((error) => console.log(error));
}