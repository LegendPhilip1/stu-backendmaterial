import { Role } from "./role.model";
import { sequelize } from "../../src/utils/sequelize";
import { Request, Response } from "express";
import { authorize } from "../auth/authorize";

export const roleRepository = sequelize.getRepository(Role);

export interface RoleData {
  id?: number;
  username?: string;
}

let getRoleData = async (req: Request, res: Response) => {
  console.log("\n\n\nI am working\n\n\n")
  authorize(req, res);
  let userData: Array<RoleData> = await roleRepository.findAll();
  // console.log(userData)
  // res.json({
  //   success: true,
  //   data: userData,
  // });
  res.json({
    success: true,
      data: [
        { id: 1, name: "超级管理员" },
        { id: 2, name: "普通角色" }
      ]
  })
};


let getRoleIds = async (req: Request, res: Response) => {
  console.log("\n\n\nI am working\n\n\n")
  authorize(req, res);
  let userData: Array<RoleData> = await roleRepository.findAll();
  if (res["userId"]) {
    if (res["userId"] == 1) {
      res.json( {
        success: true,
        data: [1]
      });
    } else if (res["userId"] == 2) {
      res.json( {
        success: true,
        data: [2]
      });
    }
  } else {
    res.json( {
      success: false,
      data: []
    });
  }
};

// let getAllUser =async (req: Request, res: Response) => {
//   authorize(req,res);
//   let user
// }

// class RoleService {
  /**
   * @route GET /list-all-role
   * @summary 用户列表查询
   * @group 用户管理相关
   * @returns {object} 200
   * @returns {Array.<RoleData>} UserData
   * @headers {integer} 200.X-Rate-Limit
   * @headers {string} 200.X-Expires-After
   * @security JWT
   */

//   getRoleData = async (req: Request, res: Response) => {
//     authorize(req, res);
//     let userData: Array<RoleData> = await roleRepository.findAll();
//     res.json({
//       success: true,
//       data: userData,
//     });
//   };

//   /**
//    * @route GET /user/query
//    * @summary 用户列表查询
//    * @group 用户管理相关
//    * @returns {object} 200
//    * @returns {Array.<UserData>} UserData
//    * @headers {integer} 200.X-Rate-Limit
//    * @headers {string} 200.X-Expires-After
//    * @security JWT
//    */

//   getUserData = async (req: Request, res: Response) => {
//     authorize(req, res);
//     let userData: Array<UserData> = await userRepository.findAll();
//     res.json({
//       success: true,
//       data: userData,
//     });
//   };

//   /**
//    * @route POST /user/add
//    * @summary 用户添加
//    * @param {UserData.model} point.body.required - 用户名、密码
//    * @group 用户管理相关
//    * @returns {object} 200
//    * @headers {integer} 200.X-Rate-Limit
//    * @headers {string} 200.X-Expires-After
//    * @security JWT
//    */

//   addUserData = async (req: Request, res: Response) => {
//     authorize(req, res);
//     const { username, password, role, phone } = req.body;
//     if (password.length < 6)
//       return res.json({
//         success: false,
//         data: { message: Message[4] },
//       });
//     let userOne = await userRepository.findOne({
//       where: { username: username },
//     });
//     if (userOne) {
//       res.json({ success: false, data: { message: "用户名重复，添加失败！" } });
//     } else {
//       let time = await getFormatDate();
//       userRepository
//         .create({
//           username: username,
//           password: password,
//           role: role,
//           phone: phone,
//           time: time,
//         })
//         .then(() => res.json({ success: true, data: { message: "添加成功" } }));
//     }
//   };

//   /**
//    * @route PUT /user/put/:{id}
//    * @summary 列表修改
//    * @param {UpdateUserData.model} id.path.required - 用户id
//    * @param {UserData.model} point.body.required - 用户名、密码、角色
//    * @group 用户管理相关
//    * @returns {object} 200
//    * @security JWT
//    */

//   putUserData = async (req: Request, res: Response) => {
//     authorize(req, res);
//     const { id } = req.params;
//     const { username, password, role, phone } = req.body;

//     let userOne = await userRepository.findOne({
//       where: { id: id },
//     });

//     let userOneName = await userRepository.findOne({
//       where: {
//         username: username,
//       },
//     });

//     if (userOne) {
//       if (password.length < 6)
//         return res.json({
//           success: false,
//           data: { message: Message[4] },
//         });
//       if (role !== "admin" && role !== "common") {
//         return res.json({
//           success: false,
//           data: { message: "角色必须为admin或common！" },
//         });
//       }
//       if (phone != null && phone.length != 11) {
//         return res.json({
//           success: false,
//           data: { message: "请输入正确位数的电话号码！" },
//         });
//       }
//       if (userOneName && userOneName.id != userOne.id) {
//         res.json({
//           success: false,
//           data: { message: "用户名重复，修改失败！" },
//         });
//       } else {
//         let time = await getFormatDate();
//         userRepository.update(
//           {
//             username: username,
//             password: password,
//             role: role,
//             phone: phone,
//             time: time,
//           },
//           {
//             where: {
//               id: id,
//             },
//           }
//         );
//         res.json({
//           success: true,
//           data: { message: "用户信息修改成功！" },
//         });
//       }
//     } else {
//       return res.json({
//         success: false,
//         data: { message: "用户id不存在，无法修改！" },
//       });
//     }
//   };
//   /**
//    * @route DELETE /user/delete/:{id}
//    * @summary 列表删除
//    * @param {DeleteUserData.model} id.path.required - 用户id
//    * @group 用户管理相关
//    * @returns {object} 200
//    * @security JWT
//    */

//   deleteUserData = async (req: Request, res: Response) => {
//     const { id } = req.params;
//     authorize(req, res);
//     let userOne = await userRepository.findOne({ where: { id: id } });
//     if (userOne) {
//       userRepository
//         .destroy({ where: { id: id } })
//         .then(() => res.json({ success: true, data: { message: Message[8] } }));
//     } else {
//       res.json({ success: false, data: { message: "用户不存在，删除失败！" } });
//     }
//   };
// }

// const defaultRoleService = new RoleService();

// export default RoleService;
// export { defaultRoleService };
export { getRoleData,getRoleIds}
