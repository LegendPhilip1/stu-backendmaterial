import { PolymerInfo } from "./polymer_info.model";
import { sequelize } from "../../src/utils/sequelize";
import { Request, Response } from "express";
import { authorize } from "../auth/authorize";
import { Message } from "../../src/utils/enums";
import { Op } from "sequelize";
import getFormatDate from "../../src/utils/date";
import { delEmptyQueryNodes } from "../../src/utils/service-helper";
import { getFilePath, uploadFile } from "../upload/upload.service";
import * as fs from "fs";
const utils = require("@pureadmin/utils");
const polymerDao = require('./Dao/polymer_infoDao')


export interface PolymerData {
  id?: number;

  material?: string;

  formula_url?:string;

  initial_temp?: GLfloat;

  max_temp?: GLfloat;

  end_temp?: GLfloat;

  rate?: GLfloat;

  residual_mass?: GLfloat;

  atmosphere?:string;
  
  reference?:string;

  pdf_url?: string;

  time?: Date;
}

type Result = {
  count: number;
  rows: Array<PolymerData>;
};

export const polymerRepository = sequelize.getRepository(PolymerInfo);
class PolymerService {

  getStaticAnalysis= async (req: Request, res: Response) => {
    let polymerData = await polymerRepository.findAndCountAll({
      attributes:["material","formula_url","initial_temp","max_temp","end_temp","rate",
                  "residual_mass","atmosphere","reference","pdf_url","time"]
    });
    res.json({
      success: true,
      data: polymerData,
    });
  };

  getPolymerData = async (req: Request, res: Response) => {
    authorize(req, res);
    //query对象集成了所有查询字段
    let query = JSON.parse(JSON.stringify(req.query));
    //在数据库查询时候需要分离出page和size这两个属性，其他属性才是查询条件·

    let pagenation = {
      page: query.page,
      size: query.size,
    };
    let searchItem = [];
    for (let key in query) {
      if (
        key != "page" &&
        key != "size" &&
        query[key] != "null" &&
        query[key] != "" &&
        query[key] != "undefined"
      ) {
        let obj = new Object();
        obj[key] = query[key];
        searchItem.push(obj);
      }
    }
    let polymerData = await polymerRepository.findAndCountAll({
      offset: (Number(pagenation.page) - 1) * Number(pagenation.size),
      limit: Number(pagenation.size),
      where: { [Op.and]: searchItem },
      //本身where查询子句是对象形式，[Op.and]类似属性值可以是对象和对象数组形式；
    });
    res.json({
      success: true,
      data: polymerData,
    });
  };
  
  addPolymerData = async (req: Request, res: Response) => {
    authorize(req, res);
    const { material,initial_temp, max_temp, end_temp, residual_mass,atmosphere } = req.body;
    let polymerOne = await polymerRepository.findOne({
      where: { material: material },
    });
    if (polymerOne) {
      res.json({
        success: false,
        data: { message: "耐烧蚀材料名称重复，添加失败！" },
      });
    } else {
      let time = await getFormatDate();
      polymerRepository
        .create({
          material: material,
          initial_temp: initial_temp,
          max_temp: max_temp,
          end_temp:end_temp,
          residual_mass: residual_mass,
          atmosphere:atmosphere,
          time: time,
        })
        .then(() => res.json({ success: true, data: { message: "添加成功" } }));
    }
  };

  putPolymerData = async (req: Request, res: Response) => {
    authorize(req, res);
    const { id } = req.params;
    const {  material,initial_temp, max_temp, end_temp, residual_mass,atmosphere} = req.body;

    let polymerOne = await polymerRepository.findOne({
      where: { id: id },
    });

    let polymerOneName = await polymerRepository.findOne({
      where: {
        material: material,
      },
    });
    if (polymerOne) {
      if (polymerOneName && polymerOneName.id != polymerOne.id) {
        res.json({
          success: false,
          data: { message: "耐烧蚀材料名称重复，修改失败！" },
        });
      } else {
        let time = await getFormatDate();
        polymerRepository.update(
          {
            material: material,
            initial_temp: initial_temp,
            max_temp: max_temp,
            end_temp:end_temp,
            residual_mass: residual_mass,
            atmosphere:atmosphere,
            time: time,
          },
          {
            where: {
              id: id,
            },
          }
        );
      }
      res.json({
        success: true,
        data: { message: "耐烧蚀材料信息修改成功！" },
      });
    } else {
      return res.json({
        success: false,
        data: { message: "耐烧蚀材料id不存在，无法修改！" },
      });
    }
  };

  deletePolymerData = async (req: Request, res: Response) => {
    const { id } = req.params;
    authorize(req, res);
    let polymerOne = await polymerRepository.findOne({ where: { id: id } });
    if (polymerOne) {
      polymerRepository
        .destroy({ where: { id: id } })
        .then(() => res.json({ success: true, data: { message: Message[8] } }));
    } else {
      res.json({ success: false, data: { message: "耐烧蚀材料不存在，删除失败！" } });
    }
  };


  addPolymerColumn = async (req: Request, res: Response) => {
    authorize(req, res);
    try{
      let data = await polymerDao.findAll()
      res.json({
        code:1,
        result:data
      })
   }catch(e){
       console.log(e);
       res.json({
           code:1,
           msg: '添加失败'
       })
   }
  }

  deleteSearchPerformance = async (req: Request, res: Response) => {
    authorize(req, res);
  }

  addSearchPerformance = async (req: Request, res: Response) => {
    authorize(req, res);
    try{
      let data = await polymerDao.findAll();
       res.json({
           code:1,
           result:data,
       })
   }catch(e){
       console.log(e);
       res.json({
           code:2,
           msg: '查询失败'
       })
   }
  }

  uploadPolymerPdf = async (req: Request, res: Response) => {
    authorize(req, res);
    const filePathArray = await getFilePath(req, res);
    const pdf_url = filePathArray[0];
    const id = req.body.id;
    await polymerRepository.update(
      {
        pdf_url: pdf_url,
      },
      {
        where: {
          id: id,
        },
      }
    );
    await uploadFile(req, res);
    function emptyDir(path) {
      const files = fs.readdirSync(path);
      files.forEach((file) => {
        const filePath = `${path}/${file}`;
        const stats = fs.statSync(filePath);
        if (stats.isDirectory()) {
          emptyDir(filePath);
        } else {
          fs.unlinkSync(filePath);
        }
      });
    }
    emptyDir('upload_tmp');
  };

  
  uploadPolymerGif = async (req: Request, res: Response) => {
    authorize(req, res);
    const filePathArray = await getFilePath(req, res);
    const formula_url = filePathArray[0];
    const id = req.body.id;
    await polymerRepository.update(
      {
        formula_url: formula_url,
      },
      {
        where: {
          id: id,
        },
      }
    );
    await uploadFile(req, res);
    function emptyDir(path) {
      const files = fs.readdirSync(path);
      files.forEach((file) => {
        const filePath = `${path}/${file}`;
        const stats = fs.statSync(filePath);
        if (stats.isDirectory()) {
          emptyDir(filePath);
        } else {
          fs.unlinkSync(filePath);
        }
      });
    }
    emptyDir('upload_tmp');
  };

  getStaticExcel = async (req: Request, res: Response) => {
    authorize(req, res);
    res.sendFile(utils.getAbsolutePath("public/files/polymers.xlsx"));
  };

  getPolymerPdf = async (req: Request, res: Response) => {
    const id = req.query.id;
    let polymerOne = await polymerRepository.findOne({
      where: { id: id },
    });
    if (polymerOne) {
      if (polymerOne.pdf_url != null) {
        const options = {
          dotfiles: "deny",
          headers: {
            "x-timestamp": Date.now(),
            "x-sent": true,
          },
        };
        res.sendFile(utils.getAbsolutePath(polymerOne.pdf_url), options);
      } else {
        res.json({
          success: false,
          data: { message: "材料pdf未上传！" },
        });
      }
    } else {
      res.json({
        success: false,
        data: { message: "材料id不存在，无法获取pdf！" },
      });
    }
  };

  getPolymerGif = async (req: Request, res: Response) => {
    const id = req.query.id;
    let polymerOne = await polymerRepository.findOne({
      where: { id: id },
    });
    if (polymerOne) {
      if (polymerOne.formula_url != null) {
        const options = {
          dotfiles: "deny",
          headers: {
            "x-timestamp": Date.now(),
            "x-sent": true,
          },
        };
        res.sendFile(utils.getAbsolutePath(polymerOne.formula_url), options);
      } else {
        res.json({
          success: false,
          data: { message: "材料gif未上传！" },
        });
      }
    } else {
      res.json({
        success: false,
        data: { message: "材料id不存在，无法获取gif！" },
      });
    }
  };
}

const defaultPolymerService = new PolymerService();

export default PolymerService;
export { defaultPolymerService };
