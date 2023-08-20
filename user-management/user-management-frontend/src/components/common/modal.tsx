import React from "react";
import Modal from "react-modal";
import { Button } from "./button";

type Props = {
  isOpen: boolean;
  content: string;
  onClickOk: () => void;
  onClickCancel: () => void;
};

export const AlertModal: React.FC<Props> = ({
  isOpen,
  content,
  onClickOk,
  onClickCancel,
}) => {
  return (
    <div className="absolute bottom-0">
      <Modal
        isOpen={isOpen}
        onRequestClose={onClickCancel}
        className="w-1/3 bg-white border absolute top-10 left-1/3"
      >
        <div className="text-lg p-4">{content}</div>
        <div className="flex justify-end p-4 gap-2">
          <Button text="キャンセル" onClick={onClickCancel} />
          <Button
            text="OK"
            onClick={() => {
              onClickCancel();
              onClickOk();
            }}
          />
        </div>
      </Modal>
    </div>
  );
};
