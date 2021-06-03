import {TreeType} from "../types/types";

export const generateUId = (
  m = Math,
  d = Date,
  h = 16,
  s = (s: number) => m.floor(s).toString(h)
) => s(d.now() / 1000) + " ".repeat(h).replace(/./g, () => s(m.random() * h));

export const getNodeFromTree = (node: TreeType, nodeId: string): TreeType | null => {
  if (node.id === nodeId) {
    return node;
  } else if (node.children !== undefined) {
    let result = null;
    for (let i = 0; result == null && i < node.children.length; i++) {
      result = getNodeFromTree(node.children[i], nodeId);
    }
    return result;
  }
  return null;
}

export const insertNodeIntoTree = (node: TreeType, nodeId: string, newNode: TreeType): void => {
  if (node.id === nodeId) {
    if (newNode) {
      newNode.id = generateUId();
      if(!node.children){
        node.children = [];
      }
      node.children?.push(newNode);
    }
  } else if (node.children !== undefined) {
    for (let i = 0; i < node.children.length; i++) {
      insertNodeIntoTree(node.children[i], nodeId, newNode);
    }
  }
}

export const updateNodeInTree = (node: TreeType, nodeId: string, newNode: TreeType): void => {
  if (node.id === nodeId) {
    node.title = newNode.title;
    node.type = newNode.type;
    node.extension = newNode.extension;
    // node.children = newNode.children;
  } else if (node.children !== undefined) {
    for (let i = 0; i < node.children.length; i++) {
      updateNodeInTree(node.children[i], nodeId, newNode);
    }
  }
}

export const flattenTree = (node: TreeType) => {
  const arrayData: any[] = [];

  const flatten = (n: TreeType[]) => {
    for (let i = 0; i < n.length; i += 1) {
      arrayData.push(n[i]);
      if (n[i].children) {
        flatten(n[i].children as TreeType[]);
      }
    }
  };
  if(node.children){
    flatten(node.children);
  }
  arrayData.push(node);

  return arrayData;
}
