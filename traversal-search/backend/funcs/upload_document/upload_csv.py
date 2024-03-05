from fastapi import File, UploadFile


def upload_csv(file: UploadFile = File(...)):
    pass
