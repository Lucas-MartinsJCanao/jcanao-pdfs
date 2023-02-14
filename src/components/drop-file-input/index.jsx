import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import CloseIcon from "@mui/icons-material/Close";

import "./index.css";

import { ImageConfig } from "../../config/ImageConfig";
import uploadImg from "../../assets/cloud-upload-regular-240.png";

const DropFileInput = (props) => {
  const [openToast1, setOpenToast1] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenToast1(false);
  };

  const wrapperRef = useRef(null);

  const [fileList, setFileList] = useState([]);

  const onDragEnter = () => wrapperRef.current.classList.add("dragover");

  const onDragLeave = () => wrapperRef.current.classList.remove("dragover");

  const onDrop = () => wrapperRef.current.classList.remove("dragover");

  const onFileDrop = (e) => {
    const newFile = e.target.files[0];
    if (newFile) {
      if (newFile.type !== "application/pdf") {
        console.log("not pdf");
        setOpenToast1(true);

        return;
      }
      const updatedList = [...fileList, newFile];
      setFileList(updatedList);
      props.onFileChange(updatedList);
    }
  };

  const fileRemove = (file) => {
    const updatedList = [...fileList];
    updatedList.splice(fileList.indexOf(file), 1);
    setFileList(updatedList);
    props.onFileChange(updatedList);
  };

  return (
    <>
      <Snackbar
        open={openToast1}
        autoHideDuration={2000}
        onClose={handleClose}
        style={{ top: 0, left: 0, transform: "none" }}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          Not a PDF file
        </Alert>
      </Snackbar>
      <div
        ref={wrapperRef}
        className="drop-file-input"
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        <div className="drop-file-input__label">
          <img src={uploadImg} alt="Uplaod img" />
          <p>Drag & Drop your files here</p>
        </div>
        <input type="file" value="" onChange={onFileDrop} />
      </div>
      {fileList.length > 0 ? (
        <div className="drop-file-preview">
          <p className="drop-file-preview__title">Ready to upload</p>
          {fileList.map((item, index) => (
            <div key={index} className="drop-file-preview__item">
              <img
                src={
                  ImageConfig[item.type.split("/")[1]] || ImageConfig["default"]
                }
                alt=""
              />
              <div className="drop-file-preview__item__info">
                <p>{item.name}</p>
              </div>
              <span
                className="drop-file-preview__item__del"
                onClick={() => fileRemove(item)}
              >
                <CloseIcon />
              </span>
            </div>
          ))}
        </div>
      ) : null}
    </>
  );
};

DropFileInput.propTypes = {
  onFileChange: PropTypes.func,
};

export default DropFileInput;
