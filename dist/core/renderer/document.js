import { parseMarkdown } from "../../markdown/parser.js";
import { DEFAULTS } from "../constants/defaults.js";
import { parseFrontmatter } from "../../utils/frontmatter.js";
export function parseDocument(content) {
    const { meta, body } = parseFrontmatter(content);
    const html = parseMarkdown(body);
    return {
        meta: {
            title: meta.title || DEFAULTS.untitled,
            description: meta.description,
        },
        html
    };
}
//# sourceMappingURL=document.js.map