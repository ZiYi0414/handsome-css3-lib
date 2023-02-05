interface HandsomeComponent {
  index: string;
  type: string;
  children: any[];
}
export const components_data: HandsomeComponent[] = [
  {
    index: 'buttons',
    type: '按钮 Buttons',
    children: [1, 3, 4, 5, 6]
  },
  {
    index: 'loaders',
    type: '加载 Loaders',
    children: [1, 3, 4, 5, 6]
  },
  {
    index: 'switches',
    type: '开关 Switches',
    children: [1, 3, 4, 5, 6]
  },
  {
    index: 'inputs',
    type: '输入框 Inputs',
    children: [1, 3, 4, 5, 6]
  },
  {
    index: 'checkboxes',
    type: '多选框 Checkboxes',
    children: [1, 3, 4, 5, 6]
  },

  {
    index: 'others',
    type: '创想 others',
    children: [1, 3, 4, 5, 6]
  }
];
