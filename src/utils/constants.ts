import {TreeType} from "../types/types";

export const NODE_TYPE_FOLDER = 1;
export const NODE_TYPE_FILE = 2;

export const FILE_TYPE_TXT = 'txt';
export const FILE_TYPE_PNG = 'png';
export const FILE_TYPE_PDF = 'pdf';

export const fileTypes = [FILE_TYPE_TXT, FILE_TYPE_PNG, FILE_TYPE_PDF];

export const emptyNode: TreeType = {
  id: '',
  title: '',
  // isRoot: undefined,
  type: NODE_TYPE_FOLDER,
  // children: undefined,
  // extension: undefined
}
