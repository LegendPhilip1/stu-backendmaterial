import { Request, Response } from "express";
import { Message } from "../../src/utils/enums";
import * as fs from "fs";
const utils = require("@pureadmin/utils");

export const getFilePath = async (req: Request, res: Response) => {
  let filePathArray = [];

  (req.files as Array<any>).forEach((ev, index) => {
    /* generateOriginName函数提供文件名称自定义功能*/
    function generateOriginName() {
      let originName = Buffer.from(
        req.files[index].originalname,
        "latin1"
      ).toString("utf8");
      /**接口携带文件id参数时使用 */
      if (req.body.id) {
        if (req.baseUrl == "/polymer-info/upload-pdf") {
          originName = "Ply_" + req.body.id + ".pdf";
        }
        if (req.baseUrl == "/polymer-info/upload-gif") {
          originName = "Ply_" + req.body.id + ".gif";
        }
      }
      return originName;
    }
    /* showTypePath函数提供文件类型分拣功能 */
    function showTypePath(originalName) {
      let index = originalName.lastIndexOf(".");
      let fileExt = originalName.substr(index + 1);
      if (fileExt == "pdf") {
        return "./upload_files/pdf/" + originalName;
      }
      if (fileExt == "xls" || fileExt == "xlsx") {
        return "./upload_files/excel/" + originalName;
      }
      if (fileExt == "png" || fileExt == "jpg"||fileExt == "gif") {
        return "./upload_files/img/" + originalName;
      } else {
        return "./upload_files/" + originalName;
      }
    }
    /* 主函数体 */
    const originalName = generateOriginName();
    const fileExtPath = showTypePath(originalName);
    filePathArray.push(fileExtPath);
  });
  return filePathArray;
};

export const uploadFile = async (req: Request, res: Response) => {
  // 文件存放地址
  const des_file: any = (index: number) => {
    function showType(fileName) {
      let index = fileName.lastIndexOf(".");
      let extV = fileName.substr(index + 1);
      return extV;
    }

    let originalName = Buffer.from(
      req.files[index].originalname,
      "latin1"
    ).toString("utf8");
    /**接口携带文件id参数时使用 */
    if (req.body.id) {
      if (req.baseUrl == "/polymer-info/upload-pdf") {
        originalName = "Ply_" + req.body.id + ".pdf";
      }
      if (req.baseUrl == "/polymer-info/upload-gif") {
        originalName = "Ply_" + req.body.id + ".gif";
      }
    }
    const fileExt = showType(originalName);
    if (fileExt == "pdf") {
      return "./upload_files/pdf/" + originalName;
    }
    if (fileExt == "xls" || fileExt == "xlsx") {
      return "./upload_files/excel/" + originalName;
    }
    if (fileExt == "png" || fileExt == "jpg" || fileExt == "gif") {
      return "./upload_files/img/" + originalName;
    } else {
      return "./upload_files/" + originalName;
    }
  };
  let filesLength = req.files.length as number;
  let result = [];

  function asyncUpload() {
    return new Promise((resolve, rejects) => {
      (req.files as Array<any>).forEach((ev, index) => {
        fs.readFile(req.files[index].path, function (err, data) {
          fs.writeFile(des_file(index), data, function (err) {
            if (err) {
              rejects(err);
            } else {
              while (filesLength > 0) {
                result.push({
                  fileName: Buffer.from(
                    req.files[filesLength - 1].originalname,
                    "latin1"
                  ).toString("utf8"),
                  filePath: utils
                    .getAbsolutePath(des_file(filesLength - 1))
                    .replace("\\", "/"),
                });
                filesLength--;
              }
              if (filesLength === 0) resolve(result);
            }
          });
        });
      });
    });
  }
  return asyncUpload()
    .then(async (fileList) => {
      res.json({
        success: true,
        data: {
          message: Message[11],
          fileList,
        },
      });
    })
    .catch(() => {
      res.json({
        success: false,
        data: {
          message: Message[10],
        },
      });
    });
};
