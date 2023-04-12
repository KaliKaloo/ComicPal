import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Typography from '@tiptap/extension-typography'

import {
  RiBold,
  RiItalic,
  RiUnderline,
  RiStrikethrough,
  RiListOrdered,
  RiListUnordered,
  RiH1,
  RiH2,
  RiH3,
  RiDoubleQuotesL,
  RiArrowGoBackLine,
  RiArrowGoForwardLine
} from "react-icons/ri";
import "./NotepadStyle.css";

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="menuBar">
      <div>
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "is_active" : ""}
        >
          <RiBold />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? "is_active" : ""}
        >
          <RiItalic />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={editor.isActive("underline") ? "is_active" : ""}
        >
          <RiUnderline />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={editor.isActive("strike") ? "is_active" : ""}
        >
          <RiStrikethrough />
        </button>
		<button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive("bulletList") ? "is_active" : ""}
        >
          <RiListUnordered />
        </button>
		<button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive("orderedList") ? "is_active" : ""}
        >
          <RiListOrdered />
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={
            editor.isActive("heading", { level: 1 }) ? "is_active" : ""
          }
        >
          <RiH1 />
        </button>
		<button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={
            editor.isActive("heading", { level: 2 }) ? "is_active" : ""
          }
        >
          <RiH2/>
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={
            editor.isActive("heading", { level: 3 }) ? "is_active" : ""
          }
        >
          <RiH3/>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive("blockquote") ? "is_active" : ""}
        >
          <RiDoubleQuotesL />
        </button>
		
      </div>
      <div>
        <button onClick={() => editor.chain().focus().undo().run()}>
          <RiArrowGoBackLine />
        </button>
        <button onClick={() => editor.chain().focus().redo().run()}>
          <RiArrowGoForwardLine />
        </button>
      </div>
    </div>
  );
};

const NotePad = ({ setDescription }) => {
  const editor = useEditor({
    extensions: [StarterKit, Underline, Typography],
    content: ``,

    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setDescription(html);
    },
  });

  return (
    <div className="textEditor">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};
export default NotePad;