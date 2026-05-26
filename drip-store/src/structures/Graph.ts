// Grafo — productos relacionados por tags/categoría

class Graph {
  private adjacency: Map<string, Set<string>> = new Map();

  addNode(id: string): void {
    if (!this.adjacency.has(id)) this.adjacency.set(id, new Set());
  }

  addEdge(idA: string, idB: string): void {
    this.addNode(idA);
    this.addNode(idB);
    this.adjacency.get(idA)!.add(idB);
    this.adjacency.get(idB)!.add(idA);
  }

  getRelated(id: string): string[] {
    return Array.from(this.adjacency.get(id) ?? []);
  }

  buildFromProducts(products: { id: string; category: string; tags: string[] }[]): void {
    products.forEach(p => this.addNode(p.id));
    for (let i = 0; i < products.length; i++) {
      for (let j = i + 1; j < products.length; j++) {
        const a = products[i];
        const b = products[j];
        const sameCategory = a.category === b.category;
        const sharedTag = a.tags.some(t => b.tags.includes(t));
        if (sameCategory || sharedTag) this.addEdge(a.id, b.id);
      }
    }
  }
}

export default Graph;