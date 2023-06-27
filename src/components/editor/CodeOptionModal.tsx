import { AModal } from 'modal';
import styled from 'styled-components';

/**
 * @param title 标题
 * @param htmlCode 编辑器填充 HTML code
 * @param cssCode 编辑器填充 CSS code
 * @param renderMenuStyle 补丁 渲染到选项菜单的样式
 */
interface ICodeOption {
  title: string;
  htmlCode: string;
  cssCode: string;
  renderMenuStyle?: string;
}

const baseCodeOption: ICodeOption[] = [
  {
    title: '按钮 Buttons',
    htmlCode: '<button>Button</button>',
    cssCode:
      'button {\r\n border: 1px solid white;\r\n padding: 10px 18px;\r\n border-radius: 6px;\r\n}\r\n\r\nbutton:hover {\r\n  background-color: white;\r\n  color: #000;\r\n}\r\n\r\n',
    renderMenuStyle:
      'button{background-color:#fafafa;border-color:#635985;color:#000;} button:hover{background-color: inherit;}'
  },
  {
    title: '加载 Loaders',
    htmlCode: '<div class="loader"></div>',
    cssCode:
      '.loader {\r\n  display: inline-block;\r\n  width: 20px;\r\n  height: 20px;\r\n  padding: 20px;\r\n  border: 2px solid #ccc;\r\n  border-top-color: #333;\r\n  border-radius: 50%;\r\n  animation: spin 1s ease-in-out infinite;\r\n}\r\n\r\n@keyframes spin {\r\n  to {\r\n    transform: rotate(360deg);\r\n  }\r\n}'
  },
  {
    title: '开关 Switches',
    htmlCode:
      '<div class="switch">\r\n  <input type="checkbox" id="toggle">\r\n  <label for="toggle"></label>\r\n</div>',
    cssCode:
      '.switch {\r\n  position: relative;\r\n  display: inline-block;\r\n  width: 40px;\r\n  height: 20px;\r\n}\r\n\r\n.switch input[type="checkbox"] {\r\n  opacity: 0;\r\n  width: 0;\r\n  height: 0;\r\n}\r\n\r\n.switch label {\r\n  position: absolute;\r\n  top: 0;\r\n  left: 0;\r\n  right: 0;\r\n  bottom: 0;\r\n  background-color: #ccc;\r\n  border-radius: 20px;\r\n  transition: background-color 0.2s ease-in-out;\r\n}\r\n\r\n.switch label:after {\r\n  content: "";\r\n  position: absolute;\r\n  top: 2px;\r\n  left: 2px;\r\n  width: 16px;\r\n  height: 16px;\r\n  background-color: #fff;\r\n  border-radius: 50%;\r\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);\r\n  transition: transform 0.2s ease-in-out;\r\n}\r\n\r\n.switch input[type="checkbox"]:checked + label {\r\n  background-color: #4caf50;\r\n}\r\n\r\n.switch input[type="checkbox"]:checked + label:after {\r\n  transform: translateX(20px);\r\n}'
  },
  {
    title: '输入框 Inputs',
    htmlCode: '<input type="text" placeholder="请输入 Please enter">',
    cssCode:
      'input[type="text"],\r\ninput[type="email"],\r\ninput[type="password"] {\r\n  display: block;\r\n  width: 100%;\r\n  padding: 8px 12px;\r\n  font-size: 16px;\r\n  line-height: 1.5;\r\n  color: #333;\r\n  background-color: #fff;\r\n  border: 1px solid #ccc;\r\n  border-radius: 4px;\r\n  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);\r\n  transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;\r\n}\r\n\r\ninput[type="text"]:focus,\r\ninput[type="email"]:focus,\r\ninput[type="password"]:focus {\r\n  outline: none;\r\n  border-color: #4caf50;\r\n  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1), 0 0 0 4px rgba(76, 175, 80, 0.2);\r\n}',
    renderMenuStyle:
      'width: 80%;text-alive:tenter;display: block;margin: 0 auto;'
  },
  {
    title: '多选框 Checkboxes',
    htmlCode: '<label>\r\n  <input type="checkbox">\r\n  Option 1\r\n</label>',
    cssCode:
      'input[type="checkbox"] {\r\n  appearance: none;\r\n  -webkit-appearance: none;\r\n  -moz-appearance: none;\r\n  display: inline-block;\r\n  width: 20px;\r\n  height: 20px;\r\n  border: 2px solid #ccc;\r\n  border-radius: 4px;\r\n  vertical-align: middle;\r\n  position: relative;\r\n  transition: all 0.2s ease-in-out;\r\n}\r\n\r\ninput[type="checkbox"]:checked {\r\n  background-color: #4caf50;\r\n  border-color: #4caf50;\r\n}\r\n\r\ninput[type="checkbox"]:checked:before {\r\n  content: "✔";\r\n  position: absolute;\r\n  top: -2px;\r\n  left: 2px;\r\n  font-size: 16px;\r\n  color: #fff;\r\n  transition: all 0.2s ease-in-out;\r\n}'
  },
  {
    title: '创想 others',
    htmlCode: '<div>。。。</div>',
    cssCode: 'div{\r\n    font-weight: bold;\r\n    font-size: 22px;\r\n}'
  }
];

interface DivProps {
  css: string;
}

const DivStyled = styled.div<DivProps>`
  ${props => props.css}
`;

interface Props {
  isOpen: boolean;
  onCurrentCodeOption: (item: ICodeOption) => void;
}

const CodeOptionModal = (props: Props) => {
  const pickerCodeOption = (item: ICodeOption, i: number) => {
    props.onCurrentCodeOption(item);
  };

  return (
    <AModal isOpen={props.isOpen} onClose={() => {}} shouldCloseOnEsc>
      <p className="mb-8 text-4xl font-semibold text-center">
        😢 今天想来点什么！
      </p>
      <CodeOptionWrapper>
        {baseCodeOption.map((item, index) => (
          <div onClick={() => pickerCodeOption(item, index)} key={index}>
            <DivStyled
              css={item.cssCode + item?.renderMenuStyle}
              style={{
                height: '50px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
              dangerouslySetInnerHTML={{ __html: item.htmlCode }}
            ></DivStyled>
            <div className="title">{item.title}</div>
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
    padding: 30px 0 20px;
    border-radius: 8px;
    border: 2px solid #dcdcdc;
    background-color: #fafafa;
    text-align: center;
    cursor: pointer;
    &:hover {
      border-color: #635985;
    }
  }
  .title {
    padding: 20px 0 0 0;
    font-family: Poppins, sans-serif;
    font-weight: bold;
  }
`;

export default CodeOptionModal;
