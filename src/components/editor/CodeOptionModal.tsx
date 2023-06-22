import { useState } from 'react';
import { AModal } from 'modal';
import styled from 'styled-components';
import classNames from 'classnames';

const baseCodeOption = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const CodeOptionModal = () => {
  const [isCustomModalOpen, setIsCustomModalOpen] = useState<boolean>(true);
  const [codeOptionPicker, setCodeOptionPicker] = useState<number>(0);

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
            onClick={() => setCodeOptionPicker(index)}
          >
            {item}
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
    &.active {
      border-color: #635985;
    }
  }
`;

export default CodeOptionModal;
