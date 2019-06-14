const finalGroup = {};
let groupCount = 0;
let max3members = [];
const days = 3.15576e+10
const getAge = dob => Math.floor((new Date() - new Date(dob).getTime()) / days);

const sortAge = (students) => {
  const sortedAge = students.sort((a, b) => Number(a.dob) - Number(b.dob));
  return sortedAge;
}

const sortStudents = (array) => {
  const group1 = {};
  const group2 = {};
  const diff = 5;
   const groupStudent = array.map((value) => {
     return getAgeforAllStudent(value);
   })
    return sortAge(groupStudent);
}
const getAgeforAllStudent = (value) => {
    const birthDate = value.dob;
    const formatDob = new Date(birthDate).toISOString().split('T')[0];
    let userAge = getAge(formatDob);
    value.dob = userAge;
    value.regNo = Number(value.regNo);
    return value;
}

const createStudentGroup = (studentGroup) => {}

const groupStudentsInThreesAndAgeDifference = (list) => {
  let index = 0;
  let ageCheckIndex = 0;
  let maxNoInAGroup = 3;
  let maxDifferenceInAge = 5;
  result = [];
  i = 6, agei = 3, resl = 3
//[116,117,126,126,129,131, 133,135,140] [[116, 117][126, 126, 129][131]]
  while (index < list.length) {
    if (result.length === 0) result.push([])
    if(result[ageCheckIndex].length > 0 && ((list[index].dob - result[ageCheckIndex][0].dob) > maxDifferenceInAge)){
      result.push([list[index++]]);
      ageCheckIndex++;
      continue;
    }
    if(result[result.length - 1].length === 3){
      result.push([]);
      ageCheckIndex++;
    }
    result[result.length - 1].push(list[index++]);
  }
  return result
}

const studentGroups = groupStudentsInThreesAndAgeDifference(sortStudents(input));

let index = 0;
while (index < studentGroups.length) {
  const group = studentGroups[index];
  const groupID = `group${index + 1}`;
  const groupRegNo = [];
  let sumOfAges = 0;
  let oldestStudent = 0;
  let newStudent = {};

  const parsedGroup = group.map(student => {
    groupRegNo.push(student.regNo);
    sumOfAges = sumOfAges + student.dob;
    oldestStudent = student.dob

    if (student.age > oldestStudent) {
      oldestStudent = student.age;
    }

    newStudent = student;
    newStudent.age = newStudent.dob;
    delete (student.dob);
    return newStudent;
  });

  finalGroup[groupID] = {};
  finalGroup[groupID].members = parsedGroup;
  finalGroup[groupID].regNos = groupRegNo.sort((a,b) => a -b);
  finalGroup[groupID].oldest = oldestStudent;
  finalGroup[groupID].sum = sumOfAges;

  index++;
}