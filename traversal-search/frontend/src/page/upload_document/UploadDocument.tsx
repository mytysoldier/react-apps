import React, { useState } from "react";
import { upload_document } from "../../api/upload_document";
import Dialog from "../../component/dialog/Dialog";

function UploadDocument() {
  const [file, setFile] = useState<File | null>(null);
  const [showDialog, setShowDialog] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // フォーム送信の処理を実行する
    console.log("Submitted file:", file);
    if (file) {
      const result = await upload_document(file);
      if (result) {
        console.log("File uploaded successfully");
        setShowDialog(true);
      } else {
        console.error("Failed to upload file");
      }
    }
  };

  return (
    <div className="border-2 max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <form onSubmit={handleFormSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Select file:
            <input
              type="file"
              onChange={handleFileChange}
              className="border border-gray-400 py-2 px-4 w-full rounded-lg focus:outline-none focus:border-blue-500"
            />
          </label>
        </div>
        <button
          type="submit"
          disabled={!file}
          className="border-2 bg-blue-500 py-2 px-4 rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          送信
        </button>

        {/* ダイアログ */}
        <Dialog open={showDialog} onClose={() => setShowDialog(false)} />
      </form>
    </div>
  );
}

export default UploadDocument;
