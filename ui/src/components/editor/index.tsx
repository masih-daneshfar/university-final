import { WrapperProps } from "@react-editor-js/core";
import { createReactEditorJS } from "react-editor-js";
// @ts-ignore
import List from "@editorjs/list";
// @ts-ignore
import LinkTool from "@editorjs/link";
// @ts-ignore
import Image from "@editorjs/image";
// @ts-ignore
import Header from "@editorjs/header";
// @ts-ignore
import Quote from "@editorjs/quote";
// @ts-ignore
import CheckList from "@editorjs/checklist";

import styles from './editor.module.css';
import clsx from "clsx";

export const EDITOR_JS_TOOLS = {
  list: List,
  linkTool: LinkTool,
  image: Image,
  header: Header,
  quote: Quote,
  checklist: CheckList,
};

const ReactEditorJS = createReactEditorJS();
const Editor = ({readOnly,...props}: WrapperProps) => {
  return (
    <div
      className={clsx(
        styles.editorContainer,
        readOnly && styles.editorContainerReadOnly
      )}
    >
      <ReactEditorJS
        i18n={{ direction: "rtl" }}
        tools={EDITOR_JS_TOOLS}
        readOnly={readOnly}
        inlineToolbar
        
      placeholder="بدنه پست ...."
        {...props}
      />
    </div>
  );
};
export default Editor;
