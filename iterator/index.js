var LinkList = /** @class */ (function () {
    function LinkList() {
        this.head = null;
        this.len = 0;
    }
    /**
     * @description 在链表头部添加一项
     * @author lixiang <lixiang@aecworks.cn>
     * @date 2018-11-11
     * @param {ONode<T>} node
     * @returns
     * @memberof LinkList
     */
    LinkList.prototype.addAtHead = function (node) {
        if (this.head === null) {
            this.head = node;
            this.len++;
            return;
        }
        node.next = this.head;
        this.head = node;
        this.len++;
    };
    /**
     * @description 在链表尾端添加
     * @author lixiang <lixiang@aecworks.cn>
     * @date 2018-11-11
     * @param {ONode<T>} node
     * @memberof LinkList
     */
    LinkList.prototype.addAtTail = function (node) {
        var head = this.head;
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
    };
    LinkList.prototype.getByIndex = function (i) {
        var head = this.head, curIndex = 0;
        while (head !== null) {
            if (i === curIndex) {
                return head;
            }
            head = head.next;
            curIndex++;
        }
        return null;
    };
    LinkList.prototype.getIndex = function (node) {
        var currIndex = 0;
        var head = this.head;
        while (head !== node) {
            head = head.next;
            currIndex++;
        }
        return currIndex;
    };
    LinkList.prototype.insertAt = function (node, i) {
        var currNode = this.getByIndex(i);
        if (currNode === null)
            throw new Error('This index item is null, cannot insert at this index');
        node.next = currNode.next;
        currNode.next = node;
        this.len++;
    };
    LinkList.prototype.size = function () {
        return this.len;
    };
    return LinkList;
}());
var ONode = /** @class */ (function () {
    function ONode(val) {
        this.val = val;
        this.next = null;
    }
    return ONode;
}());
var ll = new LinkList();
for (var index = 0; index < 1000; index++) {
    ll.addAtHead(new ONode(index));
}
var item100 = ll.getByIndex(100);
console.log(item100);
console.log(ll.getIndex(item100));
ll.insertAt(new ONode(888), 100);
console.log(item100);
console.log(ll.getIndex(item100));
