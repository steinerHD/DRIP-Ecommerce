// Trie — buscador de productos por prefijo

class TrieNode {
  children: Map<string, TrieNode> = new Map();
  isEnd: boolean = false;
  productId: string | null = null;
}

class Trie {
  private root: TrieNode = new TrieNode();

  insert(word: string, productId: string): void {
    let node = this.root;
    for (const char of word.toLowerCase()) {
      if (!node.children.has(char)) {
        node.children.set(char, new TrieNode());
      }
      node = node.children.get(char)!;
    }
    node.isEnd = true;
    node.productId = productId;
  }

  search(prefix: string): string[] {
    let node = this.root;
    for (const char of prefix.toLowerCase()) {
      if (!node.children.has(char)) return [];
      node = node.children.get(char)!;
    }
    const results: string[] = [];
    this.collect(node, results);
    return results;
  }

  private collect(node: TrieNode, results: string[]): void {
    if (node.isEnd && node.productId) results.push(node.productId);
    for (const child of node.children.values()) {
      this.collect(child, results);
    }
  }
}

export default Trie;