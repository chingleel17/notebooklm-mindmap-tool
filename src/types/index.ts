interface MindMapNode {
    id: string;
    title: string;
    children: MindMapNode[];
    expanded: boolean;
}

export type { MindMapNode };