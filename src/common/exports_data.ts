import { ContentType, HSComponentProps } from 'types/component';

export interface HandsomeComponent {
  index: ContentType;
  type: string;
  children: HSComponentProps[];
}
export const components_data: HandsomeComponent[] = [
  {
    index: 'buttons',
    type: '按钮 Buttons',
    children: []
  },
  {
    index: 'loaders',
    type: '加载 Loaders',
    children: []
  },
  {
    index: 'switches',
    type: '开关 Switches',
    children: []
  },
  {
    index: 'inputs',
    type: '输入框 Inputs',
    children: []
  },
  {
    index: 'checkboxes',
    type: '多选框 Checkboxes',
    children: []
  },

  {
    index: 'others',
    type: '创想 others',
    children: []
  }
];
