import { ContentType, HSComponentProps } from 'types/component';

export interface HandsomeComponent {
  index: ContentType;
  type: string;
  children: HSComponentProps[];
}
export const components_data: HandsomeComponent[] = [
  {
    index: 'Button',
    type: '按钮 Buttons',
    children: []
  },
  {
    index: 'Loader',
    type: '加载 Loaders',
    children: []
  },
  {
    index: 'Switch',
    type: '开关 Switches',
    children: []
  },
  {
    index: 'Input',
    type: '输入框 Inputs',
    children: []
  },
  {
    index: 'CheckBox',
    type: '多选框 Checkboxes',
    children: []
  },

  {
    index: 'Other',
    type: '创想 others',
    children: []
  }
];
