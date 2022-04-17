import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Toast, ImagePicker } from "antd-mobile";
import { uploadCommonImage } from "../../services/image";
import styles from "./index.less";
import {
  toImgUrl,
  dataURLtoFile,
  changeSaveFile,
  changeSaveFileList,
  changeFileSave,
  changeFileList,
} from "./ImageUpload";
import { useSetState } from "ahooks";
import { inVideo, VideoPreview as Preview } from "./VideoPreview";

export {
  toImgUrl,
  dataURLtoFile,
  changeSaveFile,
  changeSaveFileList,
  changeFileSave,
  changeFileList,
};
export const ImageUploadPicker = (props) => {
  const { user, company, onChange, maxCount, value, onMount, ...rest } = props;
  if (!user || !company) return <>no user</>;
  const [files, setFiles] = useState([]);
  const [state, setState] = useSetState({ url: "", type: "", visible: false });
  useEffect(() => {
    //
  }, []);
  useEffect(() => {
    if (value) {
      setFiles(toImgUrl(value));
    }
  }, [onMount]);
  const onPreview = (url) => {
    const type = inVideo(url);
    if (!type) return;
    setState({
      visible: true,
      url: url,
      type,
    });
  };
  const upLoadFile = async (file) => {
    Toast.loading("上传中...", 1);
    const { user, company } = props;
    const dataUrl = file.url;
    const formData = new FormData();
    formData.append("company", user.company);
    formData.append("owner", user._id);
    formData.append("origin", "");
    formData.append("subdomain", company.subdomain);
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
    changeFiles(files, { operationType: "add" });
    Toast.hide();
  };
  const changeFiles = (files, options = {}) => {
    setFiles([...files]);
    onChange && onChange(files, options);
    console.log("fiels", files);
  };
  const onFileChange = async (files, operationType, index) => {
    if (operationType === "add") {
      const length = files.length;
      Toast.loading("上传中...", 1);
      let file = files[length - 1];
      upLoadFile(file);
      Toast.hide();
    } else {
      files.splice(index, 1);
      changeFiles(files, { operationType, index });
    }
  };
  const hasMore = () => {
    let isMore = false;
    if (!maxCount) {
      isMore = true;
    }
    if (files.length < maxCount) {
      isMore = true;
    }
    if (isMore) return "";
    return " " + styles["not-upload-more"];
  };
  return (
    <>
      <ImagePicker
        className={"ImageUploadPicker" + hasMore()}
        files={files}
        onChange={(files, operationType, index) =>
          onFileChange(files, operationType, index)
        }
        onImageClick={(index, fs) => {
          const file = fs[index] || {};
          onPreview(file?.url);
        }}
        {...rest}
      />
      <Preview
        url={state.url}
        type={state.type}
        visible={state.visible}
        onClose={() => setState({ visible: false, url: "", type: "" })}
      />
    </>
  );
};
