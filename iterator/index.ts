class LinkList<T> {
  /**
   * @description 链表的head指针，指向该链表的第一个节点
   * @type {ONode<T>}
   * @memberof LinkList
   */
  public head: ONode<T>;

  private len: number;

  /**
   * @description 在链表头部添加一项
   * @author lixiang <lixiang@aecworks.cn>
   * @date 2018-11-11
   * @param {ONode<T>} node
   * @returns
   * @memberof LinkList
   */
  addAtHead(node: ONode<T>) {
    if (this.head === null) {
      this.head = node;
      this.len++;
      return;
    }
    node.next = this.head;
    this.head = node;
    this.len++;
  }

  /**
   * @description 在链表尾端添加
   * @author lixiang <lixiang@aecworks.cn>
   * @date 2018-11-11
   * @param {ONode<T>} node
   * @memberof LinkList
   */
  addAtTail(node: ONode<T>) {
    let head = this.head;
    if (head === null) {
      this.head = node;
      this.len++;
      return;
    }
    while (head.next !== null) {
      head = head.next;
    }
    head.next = node;
    this.len++;
  }

  public getByIndex(i: number): ONode<T> {
    let head = this.head,
      curIndex = 0;
    while (head !== null) {
      if (i === curIndex) {
        return head;
      }
      head = head.next;
      curIndex++;
    }
    return null;
  }

  public getIndex(node: ONode<T>): number {
    let currIndex = 0;
    let head = this.head;
    while (head !== node) {
      head = head.next;
      currIndex++;
    }
    return currIndex;
  }

  public insertAt(node: ONode<T>, i: number) {
    const currNode = this.getByIndex(i);
    if(currNode === null) throw new Error('This index item is null, cannot insert at this index');
    node.next = currNode.next;
    currNode.next = node;
    this.len++;
  }

  public size() {
    return this.len;
  }

  constructor() {
    this.head = null;
    this.len = 0;
  }
}

class ONode<T> {
  public next: ONode<T>;
  public val: T;
  constructor(val: T) {
    this.val = val;
    this.next = null;
  }
}

const ll = new LinkList<number>();
for (let index = 0; index < 1000; index++) {
  ll.addAtHead(new ONode(index));
}

const item100 = ll.getByIndex(100);
console.log(item100);
console.log(ll.getIndex(item100));
ll.insertAt(new ONode(888), 100)
console.log(item100);
console.log(ll.getIndex(item100));
