import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { FileUpload } from ".";
import { Toast } from "antd-mobile";
import { uploadCommonImage } from "../../services/image";
import { isArray } from "lodash";
export const dataURLtoFile = (dataurl, filename) => {
  //将base64转换为文件
  var arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
};
export const changeSaveFile = ({ originalname, url, size } = {}) => {
  if (!url) return "";
  return {
    name: originalname,
    url: url,
    size: size,
  };
};
export const changeSaveFileList = (fileList = [], length = Infinity) => {
  let attachment = [];
  if(fileList?.length > 0) {
    fileList.map((item) => {
      attachment.push(changeSaveFile(item));
      return item;
    });
  }
  if (length === Infinity) return attachment;
  if (length === 0) return attachment[0] || {};
  return attachment;
};

export const changeFileList = (fileList = [], length = Infinity) => {
  let attachment = [];
  if (fileList?.length > 0) {
    fileList.map((item) => {
      attachment.push(changeFileSave(item));
      return item;
    });
  }
  if (length === Infinity) return attachment;
  if (length === 0) return attachment[0] || {};
  return attachment;
};
export const changeFileSave = ({ name, url, size } = {}) => {
  if (!url) return {};
  return {
    originalname: name,
    url: url,
    size: size,
  };
};
export const toImgUrl = (value) => {
  if (typeof value === "string") {
    return [
      {
        uid: "s",
        name: `test-string.png`,
        url: value,
      },
    ];
  } else if (isArray(value)) {
    return value.filter(Boolean).map((i, index) => {
      return {
        uid: -1 - index + "",
        name: i?.name || `test-${index}.png`,
        url: i?.url || "",
        size: i?.size || "",
      };
    });
  }
  return [];
};
export const ImageUpload = (props) => {
  const { store, onChange, value, disable } = props;
  
  const [files, setFiles] = useState([]);
  const [accept, setAccept] = useState("image/*");
  useEffect(() => {
    if (props.showVideo) {
      setAccept("video/*,audio/*");
    }
  }, []);
  useEffect(() => {
    if (value) {
      setFiles(toImgUrl(value));
    }
  }, []);
  const upLoadFile = async (file) => {
    Toast.show({
      icon: 'loading',
      content: '上传中…',
      duration:1000
    });
    const { store } = props;
    const dataUrl = file.url;
    const formData = new FormData();
    formData.append("store", store);
    formData.append("origin", "");
    formData.append("subdomain", store);
    let _file = file.file || {};
    let _exts = _file.name.split(".");
    const suffix = _exts[_exts.length - 1];
    const filename = "file-temp";
    formData.append("image", dataURLtoFile(dataUrl, `${filename}.${suffix}`));
    const { images } = await uploadCommonImage(formData);
    file.url = images[0] ? images[0].url : "";
    file.name = _file.name;
    file.size = _file.size;
    files.push(file);
    changeFiles(files);
  };
  const changeFiles = (files) => {
    setFiles([...files]);
    onChange && onChange(files);
  };
  const onItemVideoChange = async (files, operationType, index) => {
    if (operationType === "add") {
      const length = files.length;
      Toast.show({
        icon: 'loading',
        content: '加载中…',
        duration:1000
      });
      let file = files[length - 1];
      upLoadFile(file);
    } else {
      files.splice(index, 1);
      changeFiles(files);
    }
  };
  if (!store) return <>no store</>;
  return (
    <>
      <FileUpload
        files={files}
        onChange={(files, operationType, index) => {
          onItemVideoChange(files, operationType, index);
        }}
        onFileClick={(index, fs) => console.log(index, fs)}
        accept={accept}
        showVideo={true}
        disable={disable}
      />
    </>
  );
};
