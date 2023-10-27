const createNode = (value, left = null, right = null) => {
  return { value, left, right };
};

const Tree = (arr) => {
  const root = buildTree(arr);

  return { root };
};

const buildTree = (array) => {
  // Use new Set(array) to store unique values (remove duplicates)
  // Use sort((a, b) => a - b) to sort array values in ascending order
  const sortedArray = Array.from(new Set(array)).sort((a, b) => a - b);

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

  return createBalancedBST(sortedArray, 0, sortedArray.length - 1);
};

const insert = (root, value) => {
  if (root === null) {
    return createNode(value);
  }

  if (value < root.value) {
    root.left = insert(root.left, value);
  } else if (value > root.value) {
    root.right = insert(root.right, value);
  }

  return root;
};

const deleteNode = (root, value) => {
  if (root === null) {
    return root;
  }

  if (value < root.value) {
    root.left = deleteNode(root.left, value);
  } else if (value > root.value) {
    root.right = deleteNode(root.right, value);
  } else {
    if (root.left === null) {
      return root.right;
    } else if (root.right === null) {
      return root.left;
    }

    root.value = findMin(root.right);
    root.right = deleteNode(root.right, root.value);
  }

  return root;
};

const findMin = (root) => {
  while (root.left !== null) {
    root = root.left;
  }
  return root.value;
};

const find = (root, val) => {
  if (root === null || root.value === val) {
    return root;
  }

  if (val < root.value) {
    return find(root.left, val);
  } else {
    return find(root.right, val);
  }
};

// Traverse the tree in breadth-first level order:
const levelOrder = (root, func = null) => {
  const result = [];
  const queue = [];

  if (root !== null) {
    queue.push(root);
  }

  while (queue.length > 0) {
    const node = queue.shift();
    if (func !== null) {
      func(node);
    } else {
      result.push(node.value);
    }

    if (node.left !== null) {
      queue.push(node.left);
    }
    if (node.right !== null) {
      queue.push(node.right);
    }
  }

  if (func === null) {
    return result;
  }
};

// Inorder traversal: Left -> Node -> Right
const inorder = (root, func = null) => {
  const result = [];

  const traverse = (node) => {
    if (node !== null) {
      traverse(node.left);
      if (func !== null) {
        func(node);
      } else {
        result.push(node.value);
      }
      traverse(node.right);
    }
  };

  traverse(root);

  if (func === null) {
    return result;
  }
};

// Preorder traversal: Node -> Left -> Right
const preorder = (root, func = null) => {
  const result = [];

  const traverse = (node) => {
    if (node !== null) {
      if (func !== null) {
        func(node);
      } else {
        result.push(node.value);
      }
      traverse(node.left);
      traverse(node.right);
    }
  };

  traverse(root);

  if (func === null) {
    return result;
  }
};

// Postorder traversal: Left -> Right -> Node
const postorder = (root, func = null) => {
  const result = [];

  const traverse = (node) => {
    if (node !== null) {
      traverse(node.left);
      traverse(node.right);
      if (func !== null) {
        func(node);
      } else {
        result.push(node.value);
      }
    }
  };

  traverse(root);

  if (func === null) {
    return result;
  }
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

const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const BST = Tree(array);
console.log(BST.root);
prettyPrint(BST.root);
insert(BST.root, 15);
prettyPrint(BST.root);
deleteNode(BST.root, 8);
prettyPrint(BST.root);
console.log(find(BST.root, 9));
console.log(levelOrder(BST.root));
console.log(inorder(BST.root));
console.log(preorder(BST.root));
console.log(postorder(BST.root))
