/* 枣畔·纪事 — 40 项数字档案数据（种子示例数据） */
window.ZP = window.ZP || {};
/* 类别：walk 走访照片 / doc 项目文档 / meet 会议纪要 / result 帮扶成果 / award 荣誉表彰 */
ZP.archives = [
  { id: 1,  title: '到岗首日：村口石桥上的第一张合影', cat: 'walk', stageId: 1, date: '2024-07-15', place: '枣畔村村口石桥', people: '第一书记、村两委成员', effect: '记录驻村工作开端，见证帮扶队伍正式进驻', art: 'bridge' },
  { id: 2,  title: '民情地图绘制工作照', cat: 'walk', stageId: 1, date: '2024-07-28', place: '村委办公室', people: '驻村工作队全体', effect: '全村首张民情地图完成，标注11户监测对象', art: 'map' },
  { id: 3,  title: '春耕时节的梯田走访', cat: 'walk', stageId: 2, date: '2025-04-12', place: '村东梯田', people: '第一书记、包联队员', effect: '了解春耕备耕情况，宣传产业奖补政策', art: 'field' },
  { id: 4,  title: '傍晚错时走访务工返乡户', cat: 'walk', stageId: 2, date: '2025-01-28', place: '村民家中', people: '工作队员', effect: '"错时走访"机制落地，返乡户信息动态更新', art: 'home' },
  { id: 5,  title: '重阳节走访独居老人', cat: 'walk', stageId: 2, date: '2025-10-11', place: '独居老人家中', people: '党员志愿者、工作队员', effect: '送去慰问品，登记生活照料需求', art: 'home' },
  { id: 6,  title: '监测户收支核算现场', cat: 'walk', stageId: 3, date: '2026-01-10', place: '监测户家中', people: '第一书记、包联党员', effect: '"两表一图"月算账，核实年度收支', art: 'map' },
  { id: 7,  title: '代养牛场棚舍建设现场', cat: 'walk', stageId: 4, date: '2025-08-25', place: '村集体代养牛场', people: '村两委、合作社成员', effect: '标准化棚舍建成，首批肉牛入场', art: 'cow' },
  { id: 8,  title: '分红方案公示现场', cat: 'walk', stageId: 4, date: '2026-07-05', place: '村务公开栏', people: '村民代表', effect: '2026年度分红方案公示，群众驻足查看', art: 'board' },
  { id: 9,  title: '垃圾分类宣传入户', cat: 'walk', stageId: 5, date: '2025-04-15', place: '村民家中', people: '工作队员、网格员', effect: '垃圾分类知识普及，知晓率显著提升', art: 'bin' },
  { id: 10, title: '主题党日志愿服务', cat: 'walk', stageId: 6, date: '2025-07-01', place: '村内主干道', people: '全体党员、入党积极分子', effect: '庆"七一"主题党日，党员带头环境整治', art: 'flag' },

  { id: 11, title: '驻村三年任期工作规划', cat: 'doc', stageId: 1, date: '2024-07-20', place: '村委办公室', people: '驻村工作队', effect: '确立"一年打基础、两年见成效、三年成长效"路线图', art: 'doc' },
  { id: 12, title: '入户走访登记表（模板）', cat: 'doc', stageId: 2, date: '2024-07-25', place: '村委办公室', people: '驻村工作队', effect: '"三问三看"标准化表单，走访信息可追溯', art: 'doc' },
  { id: 13, title: '民情档案（一户一档）', cat: 'doc', stageId: 2, date: '2024-08-20', place: '村委档案室', people: '驻村工作队', effect: '144户档案建档立卷，动态更新', art: 'doc' },
  { id: 14, title: '"两表一图"监测台账', cat: 'doc', stageId: 3, date: '2024-09-05', place: '村委办公室', people: '驻村工作队', effect: '11户监测对象收支动态全覆盖', art: 'chart' },
  { id: 15, title: '防返贫集中排查工作方案', cat: 'doc', stageId: 3, date: '2024-11-15', place: '村委办公室', people: '村两委、驻村工作队', effect: '明确排查范围、标准、时限与责任分工', art: 'doc' },
  { id: 16, title: '代养牛项目可行性方案', cat: 'doc', stageId: 4, date: '2025-04-10', place: '村委办公室', people: '驻村工作队', effect: '经实地考察与测算，提交村两委审议通过', art: 'cow' },
  { id: 17, title: '养殖合作社章程与管理制度', cat: 'doc', stageId: 4, date: '2025-06-18', place: '村委办公室', people: '村两委、入股农户', effect: '规范合作社运行，明确防疫、饲养、销售职责', art: 'doc' },
  { id: 18, title: '代养牛项目月度跟踪台账', cat: 'doc', stageId: 4, date: '2026-01-10', place: '村集体养殖合作社', people: '合作社会计', effect: '存栏、成本、防疫逐月记录，季度公开', art: 'chart' },

  { id: 19, title: '到岗首日村两委会会议纪要', cat: 'meet', stageId: 1, date: '2024-07-15', place: '村委会议室', people: '镇包村干部、村两委、驻村工作队', effect: '完成工作交接，明确驻村工作基调', art: 'meet' },
  { id: 20, title: '入户走访问题台账研判会纪要', cat: 'meet', stageId: 2, date: '2024-08-25', place: '村委会议室', people: '驻村工作队、村两委', effect: '分类梳理34条问题，明确销号时限', art: 'meet' },
  { id: 21, title: '防返贫监测月研判会纪要', cat: 'meet', stageId: 3, date: '2026-03-30', place: '村委会议室', people: '第一书记、包联干部、网格员', effect: '研判风险线索，调整2户帮扶措施', art: 'meet' },
  { id: 22, title: '代养牛项目村民代表会纪要', cat: 'meet', stageId: 4, date: '2025-05-20', place: '村委会议室', people: '村民代表、入股农户', effect: '表决通过项目方案与入股分红规则', art: 'meet' },
  { id: 23, title: '2026年度分红方案审议会纪要', cat: 'meet', stageId: 4, date: '2026-06-28', place: '村委会议室', people: '村民代表会议', effect: '审议通过"保底+分红"分配方案', art: 'meet' },
  { id: 24, title: '人居环境整治动员会纪要', cat: 'meet', stageId: 5, date: '2024-09-15', place: '村委会议室', people: '党员、公益岗人员、志愿者', effect: '明确集中整治任务与责任片区', art: 'meet' },

  { id: 25, title: '消费帮扶专场：连翘核桃帮销', cat: 'result', stageId: 8, date: '2025-06-20', place: '县城单位食堂、电商平台', people: '驻村工作队、单位干部职工', effect: '单场帮销农副产品3.6万元', art: 'cart' },
  { id: 26, title: '务工交通补贴兑现到户', cat: 'result', stageId: 8, date: '2024-12-15', place: '村委办公室', people: '务工人员、工作队员', effect: '首轮补贴4.2万元全部兑现', art: 'money' },
  { id: 27, title: '产业奖补资金发放', cat: 'result', stageId: 8, date: '2025-11-20', place: '村委办公室', people: '种植户', effect: '连翘、核桃、小米奖补6.8万元到户', art: 'money' },
  { id: 28, title: '饮水工程提升改造', cat: 'result', stageId: 5, date: '2025-05-30', place: '全村', people: '村两委、施工队', effect: '供水管网升级，季节性缺水问题解决', art: 'water' },
  { id: 29, title: '村内巷道硬化项目', cat: 'result', stageId: 5, date: '2025-09-20', place: '村内街巷', people: '村两委、村民', effect: '硬化巷道1200米，出行条件改善', art: 'road' },
  { id: 30, title: '人居环境示范巷创建', cat: 'result', stageId: 5, date: '2025-08-25', place: '村内主干道', people: '全村群众', effect: '示范巷建成，美丽庭院评选12户', art: 'tree' },
  { id: 31, title: '农技培训：连翘管护专场', cat: 'result', stageId: 8, date: '2025-11-10', place: '村委会议室、田间地头', people: '种植户60余人', effect: '管护技能提升，来年产量可期', art: 'field' },
  { id: 32, title: '岗位信息推送与就业服务', cat: 'result', stageId: 8, date: '2026-03-15', place: '村务公开栏、微信群', people: '有就业意愿村民', effect: '推送岗位80余个，达成就业意向12人', art: 'board' },
  { id: 33, title: '首例"一键报贫"线上申报办结', cat: 'result', stageId: 7, date: '2025-03-23', place: '村委服务点', people: '申报农户、第一书记', effect: '5个工作日完成核实流转，落实临时救助', art: 'phone' },

  { id: 34, title: '全镇先进基层党组织', cat: 'award', stageId: 6, date: '2025-06-30', place: '东阳关镇', people: '枣畔村党支部', effect: '党建引领成效获镇党委表彰', art: 'award' },
  { id: 35, title: '优秀驻村工作队', cat: 'award', stageId: 1, date: '2025-12-20', place: '黎城县', people: '枣畔村驻村工作队', effect: '年度考核优秀，工作实绩获肯定', art: 'award' },
  { id: 36, title: '监测户送锦旗：真心帮扶暖人心', cat: 'award', stageId: 3, date: '2025-08-15', place: '村委办公室', people: '受助监测户', effect: '"扶危济困显真情"锦旗，群众认可', art: 'flag' },
  { id: 37, title: '人居环境整治示范村', cat: 'award', stageId: 5, date: '2025-10-20', place: '黎城县', people: '枣畔村', effect: '人居环境整治工作获县级命名', art: 'award' },
  { id: 38, title: '代养牛项目获县级产业帮扶案例', cat: 'award', stageId: 4, date: '2026-03-10', place: '黎城县', people: '枣畔村养殖合作社', effect: '作为产业帮扶典型案例交流推广', art: 'cow' },
  { id: 39, title: '村民联名感谢信', cat: 'award', stageId: 8, date: '2026-01-15', place: '村委办公室', people: '村民代表', effect: '对消费帮扶与务工补贴工作表示感谢', art: 'doc' },
  { id: 40, title: '驻村工作被县级媒体宣传报道', cat: 'award', stageId: 6, date: '2026-05-18', place: '枣畔村', people: '驻村工作队', effect: '"第一书记的一天"专题报道，反响良好', art: 'flag' }
];

/* 档案筛选维度 */
ZP.archiveFilters = {
  cat: [ ['walk','走访照片'], ['doc','项目文档'], ['meet','会议纪要'], ['result','帮扶成果'], ['award','荣誉表彰'] ]
};
