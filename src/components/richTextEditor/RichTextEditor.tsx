import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import RichTextButton from './RichTextButton';
import Link from '@tiptap/extension-link';
import {
  FaBold,
  FaItalic,
  FaLink,
  FaRedo,
  FaStrikethrough,
  FaUnderline,
  FaUndo,
  FaUnlink
} from 'react-icons/fa/index.js';
import Underline from '@tiptap/extension-underline';
import { useCallback } from 'react';

const MenuBar = ({ editor }: { editor: any }) => {
  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    // update link
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  }, [editor]);

  if (!editor) {
    return null;
  }

  if (!editor) {
    return null;
  }

  return (
    <div className='flex flex-wrap gap-2'>
      <RichTextButton
        additionalClasses={editor.isActive('bold') ? 'bg-lilacHover' : ''}
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
      >
        <FaBold />
      </RichTextButton>
      <RichTextButton
        additionalClasses={editor.isActive('italic') ? 'bg-lilacHover' : ''}
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
      >
        <FaItalic />
      </RichTextButton>
      <RichTextButton
        additionalClasses={editor.isActive('underline') ? 'bg-lilacHover' : ''}
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
      >
        <FaUnderline />
      </RichTextButton>
      <RichTextButton
        additionalClasses={editor.isActive('strike') ? 'bg-lilacHover' : ''}
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
      >
        <FaStrikethrough />
      </RichTextButton>
      <button
        type='button'
        onClick={setLink}
        className={`font-semibold bg-backgroundLightButtons px-2 py-1 hover:bg-backgroundLightButtonsHover dark:bg-teal-600 dark:hover:bg-teal-700  ${
          editor.isActive('link') ? 'bg-backgroundLightButtonsHover dark:bg-teal-700' : ''
        }`}
      >
        <FaLink />
      </button>
      <button
        type='button'
        className='font-semibold bg-backgroundLightButtons px-2 py-1 hover:bg-backgroundLightButtonsHover dark:bg-teal-600 dark:hover:bg-teal-700'
        onClick={() => editor.chain().focus().unsetLink().run()}
        disabled={!editor.isActive('link')}
      >
        <FaUnlink />
      </button>
      <RichTextButton
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
      >
        <FaUndo />
      </RichTextButton>
      <RichTextButton
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
      >
        <FaRedo />
      </RichTextButton>
    </div>
  );
};

interface RichTextEditorProps {
  setText: (text: string) => void;
}

const RichTextEditor = ({ setText }: RichTextEditorProps) => {
  const editor = useEditor({
    extensions: [StarterKit, Underline, Link],
    content: ``,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setText(html);
    }
  });

  return (
    <>
      <MenuBar editor={editor} />
      <p className='pt-4 text-lg font-semibold'>Shift + Enter to add hard break</p>
      <div className='p-2 text-zinc-900 border-2 dark:border-teal-600 rounded-lg border-backgroundLightButtons bg-white shadow-md'>
        <EditorContent editor={editor} />
      </div>
    </>
  );
};

export default RichTextEditor;
