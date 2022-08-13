import React, {useCallback, useMemo, useState} from 'react';
import ReactMarkdown from "react-markdown";
import ReactDOMServer from "react-dom/server";
import SimpleMDERedactor from "../SimpleMDERedactor";
import SimpleMdeReact from 'react-simplemde-editor';
// @ts-ignore
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
// @ts-ignore
import {dark} from 'react-syntax-highlighter/dist/esm/styles/prism'
import SimpleMDE from "react-simplemde-editor";
//import hljs from 'highlight.js/lib/core';
//import hljs from 'highlight.js';
//import javascript from 'highlight.js/lib/languages/javascript';
//import 'highlight.js/styles/github.css';
//hljs.registerLanguage('javascript', javascript);

/*type PropsType = {
    text: string
}
const Test = () => {

    const [text, setText] = useState(``)
    const handleSetText = useCallback((value: string) => {
        setText(value)
    }, [])
    return (
        <div style={{backgroundColor:"white", color: "black"}}>

            <ReactMarkdown children={text} className="markdown"/>
            <SimpleMDERedactor handleSetText={handleSetText} text={text}/>
        </div>
    );
};*/

export const Test = () => {
    const [value, setValue] = useState("Initial");

    const onChange = (value: string) => {
        setValue(value);
    };

    const autofocusNoSpellcheckerOptions = useMemo(() => {
        return {
            autofocus: true,
            spellChecker: false,
        }
    }, []);

    return (
        <div style={{backgroundColor:"white", color: "black"}}>
            <ReactMarkdown children={value}
                           className="markdown"
                           components={{
                               code({node, inline, className, children, ...props}) {
                                   const match = /language-(\w+)/.exec(className || '')
                                   return !inline && match ? (
                                       <SyntaxHighlighter
                                           children={String(children).replace(/\n$/, '')}
                                           style={dark}
                                           language={match[1]}
                                           PreTag="div"
                                           {...props}
                                       />
                                   ) : (
                                       <code className={className} {...props}>
                                           {children}
                                       </code>
                                   )
                               }
                           }}
            />
            <SimpleMdeReact
                options={autofocusNoSpellcheckerOptions}
                value={value}
                onChange={onChange}
            />
        </div>
    );
};

export default Test;