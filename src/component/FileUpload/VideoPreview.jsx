import React, { useEffect, useState } from "react";
import { Modal } from "antd-mobile";
import styles from './index.less';
export const getSuffix = (url) => {
  const _urls = url.split('.');
  const suffix  = _urls[_urls.length - 1];
  return suffix;
}
export const inVideo = (url, videoTypes=[], audioTypes=[], jpegTypes = [] ) => {
  let _video = ["mp4", "avi", "mpg", "mpeg", "mov", "swf", "ogg"].concat(videoTypes);
  let _audio = ["m4a", "mp3", "mpga", "wav", "au"].concat(audioTypes);
  let _jpeg = ["jpeg", "png", "jpg", "gif", "bmp"].concat(jpegTypes);
  let suffix = getSuffix(url) || '';
  suffix = suffix.toLowerCase();
  if(_video.includes(suffix)) {
    return 'video'
  } else if(_audio.includes(suffix)) {
    return 'audio'
  } else if(_jpeg.includes(suffix)) {
    return 'jpeg'
  }
  return false;
}
export const VideoPreview = (props) => {
  const [url, setUrl] = useState("");
  const [type, setType] = useState(false);
  useEffect(() => {
    if (props.url && props.visible) {
      setUrl(props.url);
      const _type = inVideo(props.url);
      setType(_type);
    } else {
      setUrl("");
      setType(false);
    }
  }, [props.url, props.visible]);

  // const onClick = () => {
  //   window.open(url);
  // }
  return (
    <Modal
      title={props.title || " "}
      visible={props.visible}
      onClose={props.onClose}
      closable={true}
      className={styles['preivew-modal']}
    >
      <div style={{ marginTop: 30, maxHeight: 300, width: '100%'}}>
        {type === "video" && <video style={{ width: '100%', height: '100%'}} src={url} autoPlay={true} controls  />}
        {type === "audio" && <audio style={{ width: '100%', height: 50 }} src={url} autoPlay={true} controls  />}
        {type === "jpeg" && <img style={{ width: '100%' }} src={url} alt='图片' />}
      </div>
    </Modal>
  );
};
