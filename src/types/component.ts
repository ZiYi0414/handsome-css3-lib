export type ContentType =
  | 'buttons'
  | 'inputs'
  | 'switches'
  | 'checkboxes'
  | 'loaders'
  | 'others';

export interface HSComponentProps {
  title: string;
  made_by: string;
  css: string;
  html: string;
  theme: 'dark' | 'light';
  type: ContentType;
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
