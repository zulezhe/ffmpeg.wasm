/*
 * @Author: zulezhe
 * @Date: 2023-02-17 17:19:06
 * @LastEditors: zulezhe
 * @LastEditTime: 2023-02-17 17:36:39
 * @Path: https://gitee.com/zulezhe/
 * @Description: 
 */
const resolveURL = require("resolve-url");
const readFromBlobOrFile = (blob) =>
  new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = ({
      target: {
        error: { code },
      },
    }) => {
      reject(Error(`File could not be read! Code=${code}`));
    };
    fileReader.readAsArrayBuffer(blob);
  });

// eslint-disable-next-line
export const fetchFile = async (_data) => {
  let data = _data;
  if (typeof _data === "undefined") {
    return new Uint8Array();
  }

  if (typeof _data === "string") {
    /* From base64 format */
    if (/data:_data\/([a-zA-Z]*);base64,([^"]*)/.test(_data)) {
      data = atob(_data.split(",")[1])
        .split("")
        .map((c) => c.charCodeAt(0));
      /* From remote server/URL */
    } else {
      const res = await fetch(resolveURL(_data));
      data = await res.arrayBuffer();
    }
    /* From Blob or File */
  } else if (_data instanceof File || _data instanceof Blob) {
    data = await readFromBlobOrFile(_data);
  }

  return new Uint8Array(data);
};
