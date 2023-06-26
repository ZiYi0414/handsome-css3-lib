import { useState } from 'react';
import { AModal } from 'modal';
import styled from 'styled-components';
import classNames from 'classnames';

// const baseCodeOption = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const baseCodeOption = [
  {
    title: 'button',
    htmlCode: '<button>Button</button>',
    cssCode:
      "button {\r\n  position: relative;\r\n  padding: 10px 20px;\r\n  border-radius: 7px;\r\n  border: 1px solid rgb(61, 106, 255);\r\n  font-size: 14px;\r\n  text-transform: uppercase;\r\n  font-weight: 600;\r\n  letter-spacing: 2px;\r\n  background: transparent;\r\n  color: #fff;\r\n  overflow: hidden;\r\n  box-shadow: 0 0 0 0 transparent;\r\n  -webkit-transition: all 0.2s ease-in;\r\n  -moz-transition: all 0.2s ease-in;\r\n  transition: all 0.2s ease-in;\r\n}\r\n\r\nbutton:hover {\r\n  background: rgb(61, 106, 255);\r\n  box-shadow: 0 0 30px 5px rgba(0, 142, 236, 0.815);\r\n  -webkit-transition: all 0.2s ease-out;\r\n  -moz-transition: all 0.2s ease-out;\r\n  transition: all 0.2s ease-out;\r\n}\r\n\r\nbutton:hover::before {\r\n  -webkit-animation: sh02 0.5s 0s linear;\r\n  -moz-animation: sh02 0.5s 0s linear;\r\n  animation: sh02 0.5s 0s linear;\r\n}\r\n\r\nbutton::before {\r\n  content: '';\r\n  display: block;\r\n  width: 0px;\r\n  height: 86%;\r\n  position: absolute;\r\n  top: 7%;\r\n  left: 0%;\r\n  opacity: 0;\r\n  background: #fff;\r\n  box-shadow: 0 0 50px 30px #fff;\r\n  -webkit-transform: skewX(-20deg);\r\n  -moz-transform: skewX(-20deg);\r\n  -ms-transform: skewX(-20deg);\r\n  -o-transform: skewX(-20deg);\r\n  transform: skewX(-20deg);\r\n}\r\n\r\n@keyframes sh02 {\r\n  from {\r\n    opacity: 0;\r\n    left: 0%;\r\n  }\r\n\r\n  50% {\r\n    opacity: 1;\r\n  }\r\n\r\n  to {\r\n    opacity: 0;\r\n    left: 100%;\r\n  }\r\n}\r\n\r\nbutton:active {\r\n  box-shadow: 0 0 0 0 transparent;\r\n  -webkit-transition: box-shadow 0.2s ease-in;\r\n  -moz-transition: box-shadow 0.2s ease-in;\r\n  transition: box-shadow 0.2s ease-in;\r\n}"
  }
];

interface DivProps {
  css: string;
}

const DivStyled = styled.div<DivProps>`
  ${props => props.css}
`;

const CodeOptionModal = () => {
  const [isCustomModalOpen, setIsCustomModalOpen] = useState<boolean>(true);
  const [codeOptionPicker, setCodeOptionPicker] = useState<number>(0);

  const pickerCodeOption = (i: number) => {
    setCodeOptionPicker(i);
    setIsCustomModalOpen(false);
  };

  return (
    <AModal
      isOpen={isCustomModalOpen}
      onClose={() => setIsCustomModalOpen(false)}
      shouldCloseOnEsc
    >
      <p className="mb-8 text-4xl font-semibold text-center">
        😢 今天想来点什么！
      </p>
      <CodeOptionWrapper>
        {baseCodeOption.map((item, index) => (
          <div
            className={classNames(codeOptionPicker === index && 'active')}
            onClick={() => pickerCodeOption(index)}
          >
            <DivStyled
              css={item.cssCode}
              dangerouslySetInnerHTML={{ __html: item.htmlCode }}
            ></DivStyled>
          </div>
        ))}
      </CodeOptionWrapper>
    </AModal>
  );
};

const CodeOptionWrapper = styled.div`
  width: 600px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  & > div {
    width: calc((100% - 20px) / 3);
    margin-bottom: 10px;
    padding: 30px 0;
    border-radius: 8px;
    border: 2px solid #dcdcdc;
    background-color: #fafafa;
    text-align: center;
    cursor: pointer;
    &.active {
      border-color: #635985;
    }
  }
`;

export default CodeOptionModal;
