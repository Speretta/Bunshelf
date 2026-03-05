import { parseMarkdown } from "../../markdown/parser.js";
import { UNTITLED } from "../constants/defaults.js";
import { parseFrontmatter } from "../../utils/frontmatter.js";
export function parseDocument(content) {
    const { meta, body } = parseFrontmatter(content);
    const html = parseMarkdown(body);
    return {
        meta: {
            title: meta.title || UNTITLED,
            description: meta.description,
        },
        html
    };
}
//# sourceMappingURL=document.js.map