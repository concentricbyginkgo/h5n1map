"use client";
import { useRef } from "react";
import styles from './upload.module.css';
import { uploadFile } from "@/components/utils/uploadAction";

export default function UploadForm({ fileName }) {

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
        <div key={fileName}>
          <p>Download current {fileName}</p>
        </div>
      </div>
    </div>
  );
}