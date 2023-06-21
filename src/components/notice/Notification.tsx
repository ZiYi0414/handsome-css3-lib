import React from 'react';
import { FiX } from 'react-icons/fi';

interface INoticeOptions {
  title?: any;
  content?: any;
  icon?: any;
  showClose?: boolean;
  duration?: number;
  theme?: 'light' | 'dark';
  onClose: () => void;
}
const Notification: React.FC<INoticeOptions> = props => {
  const {
    title = 'AWA UI',
    content = ' Welcome to Handsome css3 lib ',
    showClose = false,
    onClose
  } = props;
  return (
    <div className="px-4 pb-4">
      <div className="flex justify-between items-center pt-2">
        <div>{title}</div>
        {showClose && (
          <FiX size={20} onClick={onClose} className="cursor-pointer" />
        )}
      </div>
      <div>{content}</div>
    </div>
  );
};

export default Notification;
