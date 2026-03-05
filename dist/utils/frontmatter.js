export function parseFrontmatter(content) {
    const match = content.match(/^---\n([\s\S]*?)\n---\n?/);
    if (!match || !match[1]) {
        const titleMatch = content.match(/^#\s+(.+)$/m);
        return {
            meta: { title: titleMatch?.[1] ?? "Untitled" },
            body: content,
        };
    }
    const frontmatter = match[1];
    const body = content.slice(match[0].length);
    const meta = { title: "Untitled" };
    for (const line of frontmatter.split("\n")) {
        const [key, ...valueParts] = line.split(":");
        if (!key || valueParts.length === 0)
            continue;
        const value = valueParts.join(":").trim();
        switch (key.trim()) {
            case "title":
                meta.title = value.replace(/^["']|["']$/g, "");
                break;
            case "description":
                meta.description = value.replace(/^["']|["']$/g, "");
                break;
            case "order":
                meta.order = parseInt(value, 10);
                break;
            case "sidebar_label":
                meta.sidebar_label = value.replace(/^["']|["']$/g, "");
                break;
            case "hide":
                meta.hide = value === "true";
                break;
        }
    }
    return { meta, body };
}
export function extractTitle(content) {
    const frontmatterMatch = content.match(/^---\n[\s\S]*?title:\s*["']?(.+?)["']?\n/);
    if (frontmatterMatch && frontmatterMatch[1]) {
        return frontmatterMatch[1].replace(/["']$/, "");
    }
    const headingMatch = content.match(/^#\s+(.+)$/m);
    if (headingMatch && headingMatch[1]) {
        return headingMatch[1];
    }
    return null;
}
export function stripFrontmatter(content) {
    return content.replace(/^---\n[\s\S]*?\n---\n/, "");
}
//# sourceMappingURL=frontmatter.js.map