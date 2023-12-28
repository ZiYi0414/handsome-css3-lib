export type ContentType =
  | 'Button'
  | 'Input'
  | 'Switch'
  | 'CheckBox'
  | 'Loader'
  | 'Other';

export interface HSComponentProps {
  title: string;
  made_by: string;
  css: string;
  html: string;
  theme: 'dark' | 'light';
  type: ContentType;
  slug: number | string;
}

export interface SlugComponentProps {
  code: string;
  content: string;
  title: string;
  made_by: string;
  css: string;
  html: string;
  theme: 'dark' | 'light';
}

export type PickContentProps<T extends ContentType> = T extends ContentType
  ? HSComponentProps
  : any;
