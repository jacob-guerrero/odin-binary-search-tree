const createNode = (value, left = null, right = null) => {
  return { value, left, right };
};

const Tree = (arr) => {
  const root = buildTree(arr);

  return { root };
};

const buildTree = (array) => {
  const createBalancedBST = (arr, start, end) => {
    if (start > end) {
      return null;
    }

    const mid = parseInt((start + end) / 2);
    const node = createNode(arr[mid]);

    node.left = createBalancedBST(arr, start, mid - 1);
    node.right = createBalancedBST(arr, mid + 1, end);
    return node;
  };

  return createBalancedBST(array, 0, array.length - 1);
};

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

const array = [1, 2, 3, 4, 5, 6, 7];
const BST = Tree(array);
console.log(BST.root);
prettyPrint(BST.root);
