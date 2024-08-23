"use client";
import { useRef, useState, useEffect } from "react";
import styles from './upload.module.css';
import { uploadFile } from "@/components/utils/uploadAction";

// export const revalidate = 0;
export default function UploadForm({ fileName }) {

  const [success, setSuccess] = useState(undefined);

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        if (success === 'lightgreen') {
          setSuccess(undefined);
        } else {
          setSuccess('lightcoral');
        }
      }, 5000);
    } else {
    }
  }, [success]);

  const formRef = useRef(null);
  const divRef = useRef(null);

  function handleDroppedFile(e) {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0 && formRef.current) {
      formRef.current.file.files = files;
      formRef.current.requestSubmit();
    }

    divRef.current.classList.remove(styles.dragOver);
  }

  function dragStart(e) {
    e.preventDefault();
    // add dragOver class to the container
    divRef.current.classList.add(styles.dragOver);
  }

  function dragEnd(e) {
    e.preventDefault();
    // remove dragOver class from the container
    divRef.current.classList.remove(styles.dragOver);
  }

  return (
    <div className={styles.container} onDrop={handleDroppedFile} ref={divRef} style={{ backgroundColor: success === undefined ? '' : success }}
      onDragOver={dragStart} onMouseLeave={dragEnd} onDragLeave={dragEnd} onDragExit={dragEnd}>
      <form ref={formRef} className={styles.uploadForm} action={(e) => {
        // enforce file name
        setSuccess('lightblue');
        uploadFile(e, fileName).then((res) => {
          if (res) {
            setSuccess('lightgreen');
          } else {
            setSuccess('lightcoral');
          }
        })
          .catch((err) => {
            console.error('upload failed:', err);
            setSuccess('lightcoral');
          });
      }}>
        <label>
          <span>Upload new <div>{fileName}</div></span>
          <input type="file" name="file" onChange={() => {
            if (formRef.current) {
              formRef.current.requestSubmit();
            }
          }} />
        </label>
      </form>
    </div>
  );
}