import { Request, Response } from "express";
import { authorize } from "../auth/authorize";

/**
 * @route GET /asyncRoutes
 * @param {Router.model} point.body.required - the new point
 * @produces application/json application/xml
 * @consumes application/json application/xml
 * @summary 动态路由
 * @group 路由权限、路由相关
 * @returns {Response.model} 200
 * @returns {Array.<Router>} Router
 * @headers {integer} 200.X-Rate-Limit
 * @headers {string} 200.X-Expires-After
 * @security JWT
 */
/**
 * roles：页面级别权限，这里模拟二种 "admin"、"common"
 * admin：管理员角色
 * common：普通角色
 */

//除默认路由外的其他路由设置
const permissionRouter = {
  path: "/permission",
  meta: {
    title: "权限管理",
    icon: "lollipop",
    rank: 10,
    showLink: false,
  },
  children: [
    {
      path: "/permission/page/index",
      name: "PermissionPage",
      meta: {
        title: "页面权限",
        roles: ["admin", "common"],
      },
    },
    {
      path: "/permission/button/index",
      name: "PermissionButton",
      meta: {
        title: "按钮权限",
        roles: ["admin", "common"],
        auths: ["btn_add", "btn_edit", "btn_delete"],
      },
    },
  ],
};

//材料信息页面路由--rank11
const polymerRouter = {
  path: "/polymer",
  meta: {
    title: "高分子数据库",
    icon: "ep:info-filled",
    rank: 11,
  },
  children: [
    {
      path: "/polymer/index",
      name: "Polymer",
      meta: {
        title: "高分子数据库",
        roles: ["admin", "common"],
      },
    },
  ],
};
//用户列表页面路由--rank17
const userRouter = {
  path: "/user",
  meta: {
    title: "用户列表",
    icon: "ep:user-filled",
    rank: 17,
  },
  children: [
    {
      path: "/user/index",
      name: "User",
      meta: {
        title: "用户列表",
        roles: ["admin"],
      },
    },
  ],
};

//关于页面路由--rank18
const aboutRouter = {
  path: "/about",
  meta: {
    title: "关于",
    icon: "ep:eleme-filled",
    rank: 18,
  },
  children: [
    {
      path: "/about/index",
      name: "About",
      meta: {
        title: "关于",
        roles: ["admin", "common"],
      },
    },
  ],
};

//关于页面路由--rank19
const searchingRouter = {
  path: "/searching",
  meta: {
    title: "外部数据库信息",
    icon: "ep:info-filled",
    rank: 19
  },
  children: [
    {
      path: "/searching/index",
      name: "Searching",
      
      meta: {
        title: "外部数据库信息",
        roles: ["admin", "common"],
      }
    }
  ],
};

//获取路由菜单函数
const getAsyncRoutes = async (req: Request, res: Response) => {
  authorize(req,res);
  res.json({
    success: true,
    data: [
      permissionRouter,
      polymerRouter,
      aboutRouter,
      userRouter,
      searchingRouter,
    ],
  });
};

export { getAsyncRoutes };
