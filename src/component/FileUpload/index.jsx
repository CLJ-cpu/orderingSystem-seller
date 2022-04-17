import React, { useEffect, useRef, useState, Fragment } from "react";
// import { Icon } from "antd-mobile";
import { inVideo, VideoPreview as Preview } from "./VideoPreview";
import { useSetState } from "ahooks";
import { AddOutline } from 'antd-mobile-icons'
export const FileUpload = (props) => {
  const [files, setFiles] = useState([]);
  const [state, setState] = useSetState({ url: "", type: "", visible: false });
  const inputFile = useRef(null);
  useEffect(() => {
    if (props.files) {
      setFiles(props.files || []);
    }
  }, [props.files]);
  const getOrientation = function (file, callback) {
    var reader = new FileReader();
    reader.onload = function (e) {
      var view = new DataView(e.target.result);
      if (view.getUint16(0, false) !== 0xffd8) {
        return callback(-2);
      }
      var length = view.byteLength;
      var offset = 2;
      while (offset < length) {
        var marker = view.getUint16(offset, false);
        offset += 2;
        if (marker === 0xffe1) {
          var tmp = view.getUint32((offset += 2), false);
          if (tmp !== 0x45786966) {
            return callback(-1);
          }
          var little = view.getUint16((offset += 6), false) === 0x4949;
          offset += view.getUint32(offset + 4, little);
          var tags = view.getUint16(offset, little);
          offset += 2;
          for (var i = 0; i < tags; i++) {
            if (view.getUint16(offset + i * 12, little) === 0x0112) {
              return callback(view.getUint16(offset + i * 12 + 8, little));
            }
          }
        } else if ((marker & 0xff00) !== 0xff00) {
          break;
        } else {
          offset += view.getUint16(offset, false);
        }
      }
      return callback(-1);
    };
    reader.readAsArrayBuffer(file.slice(0, 64 * 1024));
  };
  const parseFile = function (file, index) {
    return new Promise(function (resolve, reject) {
      var reader = new FileReader();
      reader.onload = function (e) {
        var dataURL = e.target.result;
        if (!dataURL) {
          reject("Fail to get the " + index + " image");
          return;
        }
        var orientation = 1;
        getOrientation(file, function (res) {
          // -2: not jpeg , -1: not defined
          if (res > 0) {
            orientation = res;
          }
          resolve({
            url: dataURL,
            orientation: orientation,
            file: file,
          });
        });
      };
      reader.readAsDataURL(file);
    });
  };
  const addImage = function (imgItem) {
    var _this$props$files2 = props.files,
      files = _this$props$files2 === undefined ? [] : _this$props$files2;

    var newImages = files.concat(imgItem);
    if (props.onChange) {
      props.onChange(newImages, "add");
    }
  };
  const onFileChange = () => {
    var fileSelectorEl = inputFile.current;
    if (fileSelectorEl && fileSelectorEl.files && fileSelectorEl.files.length) {
      var files = fileSelectorEl.files;
      var imageParsePromiseList = [];
      for (var i = 0; i < files.length; i++) {
        imageParsePromiseList.push(parseFile(files[i], i));
      }
      Promise.all(imageParsePromiseList)
        .then(function (imageItems) {
          return addImage(imageItems);
        })
        .catch(function (error) {
          if (props.onFail) {
            props.onFail(error);
          }
        });
    }
    if (fileSelectorEl) {
      fileSelectorEl.value = "";
    }
  };
  const onPreview = (url) => {
    const type = inVideo(url);
    if (!type) return;
    setState({
      visible: true,
      url: url,
      type,
    });
  };
  const ShowFileList = ({
    files = [],
    onFileClick,
    onChange,
    showVideo = false,
  }) => {
    return files.map((file, index) => {
      return (
        <Fragment key={index}>
          {showVideo && (
            <div
              style={{ marginTop: 10, maxHeight: 300, width: "100%" }}
              onClick={() => {
                onPreview(file?.url);
              }}
            >
              {inVideo(file?.url) === "video" && (
                <video
                  style={{ width: "100%", height: "100%" }}
                  src={file?.url}
                  controls
                />
              )}
              {inVideo(file?.url) === "audio" && (
                <audio
                  style={{ width: "100%", height: 40 }}
                  src={file?.url}
                  controls
                />
              )}
              {inVideo(file?.url) === "jpeg" && (
                <img
                  style={{ width: '70%', objectFit:'contain' }}
                  src={'http://localhost:5500/dist/public'+file?.url}
                  alt="图片"
                />
              )}
              <div
              style={{ 
                color: "red" ,
                position: "absolute",
                right:20,
                top:'50%', 
              transform: "translate(0,-50%)"}}
              onClick={() => {
                onChange && onChange(files, "delete", index);
              }}
            >
              删除重传
            </div>
            </div>
          )}
        </Fragment>
      );
    });
  };
  //
  return (
    <div>
      <ShowFileList
        files={files}
        onFileClick={props?.onFileClick}
        onChange={props?.onChange}
        showVideo={props?.showVideo}
      />
      {files.length < 1&&!props.disable && (
        <>
          <div
            style={{
              width: "20vw",
              height: "20vw",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginLeft: 10,
              border: "1px solid #ddd",
            }}
            onClick={() => {
                inputFile.current.click && inputFile.current.click();
              }}
          >
            <AddOutline/>
          </div>
          <input
            ref={inputFile}
            style={{ visibility: "hidden" }}
            onChange={() => {
              onFileChange();
            }}
            type="file"
            accept={props.accept || "image/*,video/*,audio/*"}
          />
        </>
      )}
      <Preview
        url={state.url}
        type={state.type}
        visible={state.visible}
        onClose={() => setState({ visible: false, url: "", type: "" })}
      />
    </div>
  );
};
