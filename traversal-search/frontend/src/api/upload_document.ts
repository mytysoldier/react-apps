export async function upload_document(file: File): Promise<boolean> {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch("http://localhost:8000/upload", {
      method: "POST",
      body: formData,
    });

    // HTTPレスポンスが成功した場合はtrueを返す
    if (response.ok) {
      return true;
    } else {
      console.error("Failed to upload file:", response.statusText);
      return false;
    }
  } catch (error) {
    console.error("An error occurred while uploading file:", error);
    return false;
  }
}
