"use client";
import { useRef } from "react";
import styles from './upload.module.css';
import { uploadFile } from "./uploadAction";

export default function UploadForm({ fileName, datafile }) {

  const formRef = useRef(null);

  return (
    <div className={styles.container}>
      <form action={uploadFile} className={styles.uploadForm} ref={formRef}>
        <label>
          <span>Upload new <div>{fileName}</div></span>
          <input type="file" name="file" onChange={() => formRef.current.submit()} />
        </label>
      </form>
      <div className={styles.download}>
        <div key={datafile.path}>
          <p>Download <a href={datafile.path} download>{datafile.path.split("/").pop()}</a></p>
          <p>Modified: {new Date(datafile.modifiedDate).toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
}