import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import Notification from './Notification';

interface INoticeOptions {
  title?: any;
  content?: any;
  icon?: any;
  showClose?: boolean;
  duration?: number;
  theme?: 'light' | 'dark';
  position?: 'leftTop' | 'leftBottom' | 'rightTop' | 'rightBottom';
}

const prefix = 'awa-notice';

export const useNotice = () => {
  const [notices, setNotices] = useState<Record<string, INoticeOptions>>({});
  const containerRefs = useRef<Record<string, HTMLDivElement>>({});
  const domRefs = useRef<Record<string, HTMLDivElement>>({});

  const createContainer = (position: string): void => {
    const container = document.querySelector(
      `.${prefix} .${prefix}-${position}`
    ) as HTMLDivElement | null;
    if (!container) {
      const div = document.createElement('div');
      div.className = `${prefix} ${prefix}-${position}`;
      document.body.appendChild(div);
      containerRefs.current[position] = div;
    } else {
      containerRefs.current[position] = container;
    }
  };

  const removeContainer = (position: string): void => {
    if (containerRefs.current[position]) {
      containerRefs.current[position].remove();
    }
  };

  const addNotice = (options?: INoticeOptions): void => {
    const id = Math.random().toString(36).substr(2, 9);
    setNotices(prevNotices => ({
      ...prevNotices,
      [id]: options ?? {}
    }));
    if (!options?.showClose) {
      setTimeout(() => {
        removeNotice(id);
      }, options?.duration || 5000);
    }
  };

  const removeNotice = (id: string): void => {
    setNotices(prevNotices => {
      const updatedNotices = { ...prevNotices };
      delete updatedNotices[id];
      return updatedNotices;
    });
    if (domRefs.current[id]) {
      const dom = domRefs.current[id];
      dom.classList.add('flipOutX');
      setTimeout(() => {
        dom.remove();
        delete domRefs.current[id];
      }, 800); // 这里的 800 是过渡动画的持续时间，需要与 CSS 中的设置保持一致
    }
  };

  useEffect(() => {
    createContainer('topRight');
    return () => {
      Object.keys(containerRefs.current).forEach(position =>
        removeContainer(position)
      );
    };
  }, []);

  useEffect(() => {
    const renderNotices = (): void => {
      Object.entries(notices).forEach(([id, options]) => {
        const { position = 'rightTop' } = options;
        if (!containerRefs.current[position]) {
          createContainer(position);
        }
        if (!domRefs.current[id]) {
          const div = document.createElement('div');
          const dom = containerRefs.current[position].appendChild(div);
          dom.classList.add('awa-notice-wrap');
          domRefs.current[id] = dom;
          const root = createRoot(dom);
          root.render(
            <Notification {...options} onClose={() => removeNotice(id)} />
          );
          setTimeout(() => {
            dom.classList.add('flipInX');
          }, 0);
        }
      });
    };
    renderNotices();
  }, [notices]);

  return [addNotice];
};
