import {
  NODE_TYPE_FOLDER,
  NODE_TYPE_FILE,
  FILE_TYPE_TXT,
  FILE_TYPE_PDF,
  FILE_TYPE_PNG
} from '../utils/constants';

export type TreeNodeType = typeof NODE_TYPE_FOLDER | typeof NODE_TYPE_FILE;

export interface TreeType {
  id: string;
  title: string;
  type: TreeNodeType;
  isRoot?: boolean;
  children?: TreeType[];
  extension?: typeof FILE_TYPE_PNG | typeof FILE_TYPE_TXT | typeof FILE_TYPE_PDF;
  parentId?: string;
}
