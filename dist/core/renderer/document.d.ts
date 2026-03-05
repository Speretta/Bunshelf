export interface ParsedDocument {
    meta: {
        title: string;
        description?: string;
    };
    html: string;
}
export declare function parseDocument(content: string): ParsedDocument;
//# sourceMappingURL=document.d.ts.map