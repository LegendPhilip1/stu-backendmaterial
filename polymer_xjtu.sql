/*
 Navicat Premium Data Transfer

 Source Server         : localhost_3306
 Source Server Type    : MySQL
 Source Server Version : 50736
 Source Host           : localhost:3306
 Source Schema         : polymer_xjtu

 Target Server Type    : MySQL
 Target Server Version : 50736
 File Encoding         : 65001

 Date: 20/09/2023 10:10:52
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for polymer_info
-- ----------------------------
DROP TABLE IF EXISTS `polymer_info`;
CREATE TABLE `polymer_info`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `material` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `formula_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `initial_temp` float NULL DEFAULT NULL,
  `end_temp` float NULL DEFAULT NULL,
  `max_temp` float NULL DEFAULT NULL,
  `rate` float NULL DEFAULT NULL,
  `residual_mass` float NULL DEFAULT NULL,
  `reference` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `atmosphere` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `pdf_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `time` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 18 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of polymer_info
-- ----------------------------
INSERT INTO `polymer_info` VALUES (1, '聚乙烯醇（PVA）', './upload_files/img/Ply_1.gif', 238, 550, 264, NULL, 11, '何志成. 改性PVA基电控固体推进剂及性能研究[D]. 国防科学技术大学,2021.', '氮气', '', NULL);
INSERT INTO `polymer_info` VALUES (2, '聚苯乙烯（PS）', './upload_files/img/Ply_2.gif', 371.1, 700, 422.1, NULL, NULL, '胡伟兆.含磷氮有机化合物的设计及其聚苯乙烯复合材料的制备和性能研究[D].中国科学技术大学,2014.', '氮气', '', NULL);
INSERT INTO `polymer_info` VALUES (3, '聚对苯二甲酸丁二酯（PBT）', './upload_files/img/Ply_3.gif', 381.25, 750, 415.61, NULL, 2.75, '马冰雪.纳米Sb2O3/BPS-PBT复合材料的热稳定性及阻燃性研究[D].兰州理工大学,2019.', '氮气', './upload_files/pdf/纳米Sb_2O_3_BPS...材料的热稳定性及阻燃性研究_马冰雪.pdf', NULL);
INSERT INTO `polymer_info` VALUES (4, '三元乙丙橡胶（EPDM）', NULL, 421.7, 700, 456.7, NULL, NULL, '薛磊.三元乙丙橡胶复合材料的阻燃性能和陶瓷化性能研究[D].天津理工大学[2023-08-04].', '氮气', './upload_files/pdf/三元乙丙橡胶复合材料的阻燃性能和陶瓷化性能研究_薛磊.pdf', NULL);
INSERT INTO `polymer_info` VALUES (5, '环氧树脂（EP）', './upload_files/img/Ply_5.gif', 371, 800, 388, NULL, 18.1, 'Liu, C., et al. (2023). \"Facile synthesis of a P/N-containing heterocyclic compound for simultaneous enhancement of heat resistance, mechanical properties and fire safety of epoxy resin.\" Reactive and Functional Polymers 184.', '氮气', NULL, NULL);
INSERT INTO `polymer_info` VALUES (6, '3,6,7三氨基-[1,2,4]三唑并[4,3-b]三唑（TATOT）', './upload_files/img/Ply_6.gif', 225.3, 700, 263.3, NULL, NULL, 'Zhang, J., et al. (2023). \"Thermal behaviors, thermal decomposition mechanism, kinetic model analysis and thermal hazard prediction of 3,6,7-triamino-7H-[1,2,4]triazolo[4,3-b][1,2,4]triazole (TATOT).\" Thermochimica Acta 724.', '氮气', NULL, NULL);
INSERT INTO `polymer_info` VALUES (7, '聚（二甲基亚硅基乙炔基（甲基）亚苯基亚甲基（甲基）亚苯基乙炔基）PSMA-H', './upload_files/img/Ply_7.gif', 552, 800, 569, NULL, 84.1, 'Liu, X., et al. (2023). \"Thermal decomposition investigation on heat-resistant poly(dimethylsilylene ethynylenemethylphenylene-methylenemethylphenyleneethynylene) resins.\" Thermochimica Acta 724.', '氮气', NULL, NULL);
INSERT INTO `polymer_info` VALUES (8, 'PSMA-2-M', './upload_files/img/Ply_8.gif', 501, 800, 521, NULL, 75.8, 'Liu, X., et al. (2023). \"Thermal decomposition investigation on heat-resistant poly(dimethylsilylene ethynylenemethylphenylene-methylenemethylphenyleneethynylene) resins.\" Thermochimica Acta 724.', '氮气', NULL, NULL);
INSERT INTO `polymer_info` VALUES (9, 'PSMA-3-M', './upload_files/img/Ply_9.gif', 480, 800, 522, NULL, 55.9, 'Liu, X., et al. (2023). \"Thermal decomposition investigation on heat-resistant poly(dimethylsilylene ethynylenemethylphenylene-methylenemethylphenyleneethynylene) resins.\" Thermochimica Acta 724.', '氮气', NULL, NULL);
INSERT INTO `polymer_info` VALUES (10, '1-丁基-2,3-二甲基咪唑硝酸盐', './upload_files/img/Ply_10.gif', 275.5, 352.1, 330.58, NULL, 8.09, 'Meng, J., et al. (2021). \"Thermal hazard and decomposition kinetics of 1-butyl-2,3-dimethylimidazolium nitrate via TGA/DSC and FTIR.\" Journal of Loss Prevention in the Process Industries 72.', '氮气', NULL, NULL);
INSERT INTO `polymer_info` VALUES (11, '5，5′-双四唑-1，1 ′-二醇二羟铵（TKX-50）', './upload_files/img/Ply_11.gif', 237, 427, NULL, NULL, 12, 'Wang, X., et al. (2023). \"Review on the thermal decomposition of dihydroxylammonium 5,5′- bistetrazole-1,1′-diolate (TKX-50).\" Thermochimica Acta 719.', '氮气', NULL, NULL);
INSERT INTO `polymer_info` VALUES (12, '聚苯乙烯（PS）', './upload_files/img/Ply_12.gif', 230.1, 700, 381, NULL, 0.5, '胡伟兆.含磷氮有机化合物的设计及其聚苯乙烯复合材料的制备和性能研究[D].中国科学技术大学,2014.', '空气', NULL, NULL);
INSERT INTO `polymer_info` VALUES (13, '酚醛树脂', './upload_files/img/Ply_13.gif', 344.2, 650, 424.7, NULL, 2.5, '廖庆玲.纳米颗粒改性酚醛树脂的研究[D].武汉科技大学,2005.DOI:10.7666/d.Y975284.', '空气', NULL, NULL);
INSERT INTO `polymer_info` VALUES (14, '聚酰亚胺（PI）', NULL, 592.5, 769.9, NULL, NULL, NULL, '胡琛.耐高温Gd--MOF/高分子复合屏蔽材料热稳定性及机械性能研究[D].中国科学技术大学[2023-08-04].', '空气', NULL, NULL);
INSERT INTO `polymer_info` VALUES (15, '环氧树脂（EP）', './upload_files/img/Ply_15.gif', 281, 800, NULL, NULL, 0.1, 'Liu, C., et al. (2023). \"Facile synthesis of a P/N-containing heterocyclic compound for simultaneous enhancement of heat resistance, mechanical properties and fire safety of epoxy resin.\" Reactive and Functional Polymers 184.', '空气', NULL, NULL);
INSERT INTO `polymer_info` VALUES (16, '1-丁基-2,3-二甲基咪唑硝酸盐', './upload_files/img/Ply_16.gif', 274.68, 351.77, 330.68, NULL, 0.11, 'Meng, J., et al. (2021). \"Thermal hazard and decomposition kinetics of 1-butyl-2,3-dimethylimidazolium nitrate via TGA/DSC and FTIR.\" Journal of Loss Prevention in the Process Industries 72.', '空气', NULL, NULL);
INSERT INTO `polymer_info` VALUES (17, '双环戊二烯石油树脂（DPR）', './upload_files/img/Ply_17.gif', 161.3, 510.5, NULL, NULL, NULL, 'Su, D., et al. (2021). \"Comparison of thermal stability between dicyclopentadiene/hydrogenated dicyclopentadiene petroleum resin: Thermal decomposition characteristics, kinetics and evolved gas analysis by TGA/TG-MS.\" Thermochimica Acta 699.', '空气', NULL, NULL);

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `username` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '用户名',
  `password` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '密码',
  `phone` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '电话',
  `role` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '角色身份',
  `time` date NOT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 12 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (8, 'admin', '0192023a7bbd73250516f069df18b500', '13915589145', 'admin', '2023-04-23');
INSERT INTO `user` VALUES (9, 'admin1', '0192023a7bbd73250516f069df18b500', '13915589145', 'admin', '2023-04-07');
INSERT INTO `user` VALUES (10, 'admin23', '0192023a7bbd73250516f069df18b500', '13915589145', 'common', '2023-04-07');
INSERT INTO `user` VALUES (11, '邓俊楷', '0192023a7bbd73250516f069df18b500', '12345678910', 'admin', '2023-04-23');

SET FOREIGN_KEY_CHECKS = 1;
