interface DialogProps {
  open: boolean;
  onClose: () => void;
}

const Dialog: React.FC<DialogProps> = ({ open, onClose }) => {
  return open ? (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="bg-white p-4 rounded-lg border-2 border-gray-300 shadow-md">
        <p className="text-lg font-semibold">
          ファイルをアップロードしました。
        </p>
        <button
          onClick={onClose}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          閉じる
        </button>
      </div>
    </div>
  ) : null;
};

export default Dialog;
