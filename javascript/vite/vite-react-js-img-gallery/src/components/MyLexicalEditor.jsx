
import React from 'react';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { ListNode, ListItemNode } from '@lexical/list';
import { AutoLinkNode, LinkNode } from '@lexical/link';
import { CodeNode } from '@lexical/code';

const theme = {
    paragraph: 'editor-paragraph',
};

function onError(error) {
    console.error(error);
}

export function MyLexicalEditor() {
    const initialConfig = {
        namespace: 'MyEditor',
        theme,
        onError,
    };

    const msWordConfig = {
        namespace: 'MsWordEditor',
        theme,
        onError,
        nodes: [
            HeadingNode,
            QuoteNode,
            ListNode,
            ListItemNode,
            AutoLinkNode,
            LinkNode,
            CodeNode
        ]
    };

    return (
        <div style={{ marginTop: '20px', border: '1px solid #ccc', borderRadius: '4px', overflow: 'hidden' }}>
            <LexicalComposer initialConfig={initialConfig}>
                <div className="editor-container" style={{ position: 'relative', minHeight: '300px' }}>
                    <RichTextPlugin
                        contentEditable={
                            <ContentEditable
                                style={{
                                    minHeight: '300px',
                                    padding: '10px',
                                    outline: 'none',
                                }}
                            />
                        }
                        placeholder={
                            <div
                                style={{
                                    position: 'absolute',
                                    top: '10px',
                                    left: '10px',
                                    color: '#999',
                                    pointerEvents: 'none',
                                }}
                            >
                                Enter some text in the Basic Editor...
                            </div>
                        }
                        ErrorBoundary={LexicalErrorBoundary}
                    />
                    <HistoryPlugin />
                </div>
            </LexicalComposer>

            <div style={{ borderTop: '2px dashed #ccc', margin: '20px 0' }}></div>

            <h3>MS Word / RTF Ready Editor</h3>
            <div style={{ border: '1px solid #ccc', borderRadius: '4px', overflow: 'hidden' }}>
                <LexicalComposer initialConfig={msWordConfig}>
                    <div className="editor-container" style={{ position: 'relative', minHeight: '300px' }}>
                        <RichTextPlugin
                            contentEditable={
                                <ContentEditable
                                    style={{
                                        minHeight: '300px',
                                        padding: '10px',
                                        outline: 'none',
                                    }}
                                />
                            }
                            placeholder={
                                <div
                                    style={{
                                        position: 'absolute',
                                        top: '10px',
                                        left: '10px',
                                        color: '#999',
                                        pointerEvents: 'none',
                                    }}
                                >
                                    Paste MS Word content here...
                                </div>
                            }
                            ErrorBoundary={LexicalErrorBoundary}
                        />
                        <HistoryPlugin />
                    </div>
                </LexicalComposer>
            </div>
        </div>
    );
}
