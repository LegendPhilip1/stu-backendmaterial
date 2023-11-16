export default {
    sequelize: {
      host: "127.0.0.1",
      // host: "49.208.46.17",
      database: "polymer_xjtu",
      username: "root",
      password: "123456",
      dialect: "mysql",
      option: { logging: console.log },
    },
    user: {
      root: "root",
      password: "123456",
      dbName: "mtrl_v1",
    },
    defaultPageSize: 10,
    defaultPageNum: 1,
    resourcePdf: "./upload_files/pdf",
    resourceExcel: "./upload_files/excel",
    resourceImages: "./upload_files/img",
    scriptPath: "./upload_files/script",
    tempPath:"upload_temp",
    proxy: {
      // target: "http://49.208.46.17:3001",
  
      // target:"http://10.180.190.141:3001",
      target:"http://10.180.107.190:3001",
  
    },
  };
  