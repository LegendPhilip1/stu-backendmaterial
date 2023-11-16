import { defaultPolymerService } from "./polymer_info.service";
import * as express from "express";
import * as multer from "multer";
export const polymerRouter = express.Router();

//用户列表业务接口
/**查询接口*/
polymerRouter.get("/query", function (req, res) {
  defaultPolymerService.getPolymerData(req, res);
});

/**添加接口*/
polymerRouter.post("/add", (req, res) => {
  defaultPolymerService.addPolymerData(req, res);
});

/**修改接口*/
polymerRouter.put("/put/:id", (req, res) => {
  defaultPolymerService.putPolymerData(req, res);
});

/**删除接口*/
polymerRouter.delete("/delete/:id", (req, res) => {
  defaultPolymerService.deletePolymerData(req, res);
});

/**添加列接口*/
polymerRouter.post("/addcolumn", (req, res) => {
  defaultPolymerService.addPolymerColumn(req, res);
});
/*
polymerRouter.post("/addperformance", (req, res) => {
  defaultPolymerService.addSearchPerformance(req, res);
});
*/
polymerRouter.post("/deleteperformance", (req, res) => {
  defaultPolymerService.deleteSearchPerformance(req, res);
});


// 新建存放临时文件的文件夹
const upload_tmp = multer({ dest: "upload_tmp/" });

//*上传pdf接口
polymerRouter.post("/upload-pdf", upload_tmp.any(), (req, res) => {
  defaultPolymerService.uploadPolymerPdf(req, res);
});

//*上传gif接口
polymerRouter.post("/upload-gif", upload_tmp.any(), (req, res) => {
  defaultPolymerService.uploadPolymerGif(req, res);
});

/**下载模板文件接口 */
polymerRouter.get("/static-excel", (req, res) => {
  defaultPolymerService.getStaticExcel(req, res);
});

/**下载pdf文件接口 */
polymerRouter.get("/pdf/query", (req, res) => {
  defaultPolymerService.getPolymerPdf(req, res);
});

/**下载gif文件接口 */
polymerRouter.get("/gif/query", (req, res) => {
  defaultPolymerService.getPolymerGif(req, res);
});

/**查询静态数据接口 */
polymerRouter.get("/static/query", (req, res) => {
  defaultPolymerService.getStaticAnalysis(req, res);
});