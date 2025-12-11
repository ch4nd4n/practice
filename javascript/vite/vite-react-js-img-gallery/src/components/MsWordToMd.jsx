
import React, { useState, useRef, useEffect } from 'react';
import TurndownService from 'turndown';
import { MyLexicalEditor } from './MyLexicalEditor';

export function MsWordToMd() {
    const [content, setContent] = useState('');
    const textareaRef = useRef(null);
    const cursorRef = useRef(null);

    useEffect(() => {
        if (cursorRef.current !== null && textareaRef.current) {
            textareaRef.current.selectionStart = cursorRef.current;
            textareaRef.current.selectionEnd = cursorRef.current;
            cursorRef.current = null;
        }
    }, [content]);

    const handlePaste = (e) => {
        e.preventDefault();

        const turndown = new TurndownService();
        const html = e.clipboardData.getData('text/html');
        const text = e.clipboardData.getData('text/plain');

        const source = html || text;
        const markdown = source ? turndown.turndown(source) : '';

        const start = textareaRef.current.selectionStart;
        const end = textareaRef.current.selectionEnd;

        const newContent =
            content.substring(0, start) + markdown + content.substring(end);

        setContent(newContent);
        cursorRef.current = start + markdown.length;
    };

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            <h2>MS Word to Markdown Converter</h2>
            <p>Paste your content below (e.g., from MS Word) to convert it to Markdown.</p>
            <textarea
                id="editor"
                ref={textareaRef}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                onPaste={handlePaste}
                style={{
                    width: '100%',
                    height: '500px',
                    padding: '10px',
                    fontFamily: 'monospace',
                    fontSize: '14px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    resize: 'vertical',
                }}
                placeholder="# Paste formatted content here..."
            />

            <div style={{ marginTop: '40px' }}>
                <h3>Lexical Editor</h3>
                <MyLexicalEditor />
            </div>
        </div>
    );
}
