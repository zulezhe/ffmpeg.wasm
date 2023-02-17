/*
 * @Author: zulezhe
 * @Date: 2023-02-17 17:19:05
 * @LastEditors: zulezhe
 * @LastEditTime: 2023-02-17 17:34:31
 * @Path: https://gitee.com/zulezhe/
 * @Description: 
 */
import pkg from '../../package.json';
const resolveURL = require('resolve-url');
/*
 * Default options for browser environment
 */
console.log("process.env.NODE_ENV===>",process.env.NODE_ENV);
const corePath = typeof process !== 'undefined' && process.env.NODE_ENV === 'development'
? resolveURL('/node_modules/@ffmpeg/core/dist/ffmpeg-core.js')
  : `https://unpkg.com/@ffmpeg/core@${pkg.devDependencies['@ffmpeg/core'].substring(1)}/dist/ffmpeg-core.js`;

export default { corePath };
