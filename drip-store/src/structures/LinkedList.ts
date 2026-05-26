// Lista enlazada — historial de productos vistos recientemente

class ListNode<T> {
  value: T;
  next: ListNode<T> | null = null;
  constructor(value: T) { this.value = value; }
}

class LinkedList<T> {
  private head: ListNode<T> | null = null;
  private size: number = 0;
  private maxSize: number;

  constructor(maxSize = 10) { this.maxSize = maxSize; }

  prepend(value: T): void {
    const node = new ListNode(value);
    node.next = this.head;
    this.head = node;
    this.size++;
    if (this.size > this.maxSize) this.removeLast();
  }

  private removeLast(): void {
    if (!this.head) return;
    if (!this.head.next) { this.head = null; this.size--; return; }
    let current = this.head;
    while (current.next?.next) current = current.next;
    current.next = null;
    this.size--;
  }

  toArray(): T[] {
    const result: T[] = [];
    let current = this.head;
    while (current) { result.push(current.value); current = current.next; }
    return result;
  }

  getSize(): number { return this.size; }
}

export default LinkedList;