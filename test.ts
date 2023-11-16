const angle1 = 175;
const angle2 = 53;
const angle3 =34;
const angle4 = null;
const angle5 = 82;
const angle6 = null;

let angles = [angle1,angle2,angle3,angle4,angle5,angle6]
angles = angles.filter(item=>item !==null)
const angleStr = angles.join("-")
console.log(angleStr)