//import express module
const express = require("express");

//import body-parser module
const bodyParser = require("body-parser");

// import bcrypt module
const bcrypt = require("bcrypt");

// import multer module
const multer = require("multer");

// import path module
const path = require("path");
//import jsonwebtoken  module
const jwt = require('jsonwebtoken');
// import mongoose module
const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/educationDB");

//créer une app BE named app
const app = express();

//configurer le body-parser pour structurer la réponse du BE sous format JSON
app.use(bodyParser.json());
//configurer le body-parser pour parser le req reçu du FE (accéder au contenu de l'obj)
app.use(bodyParser.urlencoded({ extended: true }));

//security config
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, DELETE, OPTIONS, PATCH, PUT"
    );
    next();
});
//shortcut:files
app.use('/images', express.static(path.join('backend/images')));
app.use('/cvs', express.static(path.join('backend/cvs')));
//Types de Média
const MIME_TYPE = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg',
   
   
}

const MIME_TYPE_PDF = {
    'application/pdf': 'pdf',
 
   
   
}
const storage = multer.diskStorage({
    // destination
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE[file.mimetype];
        if (isValid) {
            cb(null, 'backend/images')
        }
       
    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const extension = MIME_TYPE[file.mimetype];
        const imgName = name + '-' + Date.now() + '-crococoder-' + '.' +
            extension;
        cb(null, imgName);
    }
});

const storagePdf = multer.diskStorage({
    // destination
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE[file.mimetype];
        if (isValid) {
            cb(null, 'backend/cvs')
        }
       
    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const extension = MIME_TYPE[file.mimetype];
        const imgName = name + '-' + Date.now() + '-crococoder-' + '.' +
            extension;
        cb(null, imgName);
    }
});
const upload = multer({ storage: storage });
const uploadPdf = multer({ storage: storagePdf });
// Models Importation
const Course = require("./models/course");
const Student = require("./models/student");
const User = require("./models/user");
const Teacher = require("./models/teacher");
const Parent = require("./models/parent");

app.get('/downloadFile/:name' , (req , res) => {
    const fileName = req.params.name;
  const directoryPath =  "backend/images/";

  res.download(directoryPath + fileName, fileName, (err) => {
    if (err) {
      res.status(500).send({
        message: "Could not download the file. " + err,
      });
    }
  });

})
//business logic
//business logic to get all courses
app.get('/courses', (req, res) => {
   
    Course.find().then(
        (docs) => {
            
            res.json({ coursesTab: docs });
        }
    )

})
//business logic to get course by id 
app.get('/courses/getCourseById/:id', (req, res) => {
    console.log('here into get courseById');
    //récupérer l'id
    let courseId = req.params.id;
    Course.findById(courseId).then(
        (doc) => {
            console.log('here doc ', doc);
            res.json({ findedCourse: doc })

        });


})
//business logic to delete selected course
app.delete('/courses/:id', (req, res) => {
    let courseId = req.params.id;
    Course.deleteOne({ _id: courseId }).then(
        (deleteResponse) => {
            console.log('here delete response', deleteResponse);
            if (deleteResponse.deletedCount == 1) {
                res.json({ message: "Success" })
            } else {
                res.json({ message: "Echec" })
            }

        }
    )

})
//business logic to add  course
app.post('/courses/add/:teacherid', async (req, res) => {
    let teacherId = req.params.teacherid;
    try {
        let userT = await User.findById(teacherId);
        
        if (!userT) {
            return res.json({ msg: "Teacher not found" });
        }
        let teacher = await Teacher.findOne({ userId: userT._id });
        let dataCourse = {
            "nom":req.body.nom , 
            "description": req.body.description,
            "duration": req.body.duration,
            "teacherId": teacher._id
        }
        let newCourse = new Course(dataCourse);
        let savedCourse = await newCourse.save();
       
        teacher.courses.push({ courseId: savedCourse._id });
        await teacher.save();

        res.json({ msg: "Course added with success" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error" });
    }
});
 
// bl to get available courses 
app.get('/courses/getAvailableCourses', async (req, res) => {
    
   

    try {
        console.log('Getting available courses ...');
    
        // Fetch all teachers
        let availableCourses = await Course.find();
    
        // Map the results to the desired format
        let formattedCourses = await Promise.all(
            availableCourses.map(async (course) => {
            // Fetch the corresponding user information based on userId
          
    
            return {
              _id:course._id,
              nom: course.nom,
             
            };
          })
        );
    
        // Send the formatted result as JSON response
        res.json({ coursesTab: formattedCourses });
      } catch (error) {
        console.error('Error fetching available courses :', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }

})

//buisness logic to update course
app.put('/courses', (req, res) => {
    console.log('here is course obj', req.body);
    Course.updateOne({ _id: req.body._id }, req.body).then(
        (updateResponse) => {
            console.log("here update response", updateResponse);
            if (updateResponse.nModified == 1) {
                res.json({ msg: "success" })
            } else {
                res.json({ msg: "Error" })
            }

        }
    )

})

// BL to get students by course 
app.get('/courses/getStudentsByCourse/:courseid', async (req, res) => {
    console.log('here into BL: getStudentsByCourse');
    try {
        let courseId = req.params.courseid;
        let course = await Course.findById(courseId);
        let result = [];

        // Use map instead of forEach to get an array of promises
        let promises = course.students.map(async s => {
            let student = await Student.findById(s.studentId);
            

            let user = await User.findById(student.userId);
           
            result.push({
                '_id': student._id,
                'image': student.image,
                'firstName': user.firstName,
                'lastName': user.lastName,
                'email': user.email,
                'tel': user.tel
            });
        });

        // Wait for all promises to resolve before sending the response
        await Promise.all(promises);

        res.json({ studentTab: result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//BL of signup
app.post('/users/signup', async (req, res) => {
    console.log('here  signup BL', req.body);
    const cryptedPwd = await bcrypt.hash(req.body.password, 10);
   
    req.body.password = cryptedPwd;
    let user = new User(req.body);
    user.save();
    res.json({ msg: " Added with success" });
   

})

// BL of Login
app.post('/users/login', async (req, res) => {
    const JWT_SIGN_SECRET = 'crococoders2024';
    try {
        console.log("here login", req.body);
        let user = req.body;

        // Check if tel exists
        const doc = await User.findOne({ tel: user.tel });

        // Tel is not found
        if (!doc) {
            return res.status(401).json({ error: "Invalid Tel" });
        }

        if(!doc.active && doc.role == 'Teacher')
        {
            return res.status(401).json({ error: " Compte inactif , Vueillez contacter votre administrateur" });

        }


        // Compare Passwords
        const pwdResult = await bcrypt.compare(user.password, doc.password);
        if (!pwdResult) {
            return res.status(401).json({ error: "Invalid Password" });
        }

        // Generate JWT token
        const userToSend = {
            fName: doc.firstName,
            lName: doc.lastName,
            id: doc._id,
            role: doc.role,
        };
        const token = jwt.sign(userToSend, JWT_SIGN_SECRET, { expiresIn: '24h' });

        res.json({
            msg: "Welcome",
            token: token,
            role: doc.role,
            id: doc._id
        });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


//business logic
//business logic to get all teachers
app.get('/teachers', async (req, res) => {
    try {
      console.log('Getting all teachers...');
  
      // Fetch all teachers
      let teachers = await Teacher.find();
  
      // Map the results to the desired format
      let formattedTeachers = await Promise.all(
        teachers.map(async (teacher) => {
          // Fetch the corresponding user information based on userId
          const user = await User.findOne({ _id: teacher.userId });
  
          return {
            _id:teacher._id,
            firstName: user.firstName,
            lastName: user.lastName,
            speciality: teacher.speciality,
            active:user.active
          };
        })
      );
  
      // Send the formatted result as JSON response
      res.json({ teachersTab: formattedTeachers });
    } catch (error) {
      console.error('Error fetching teachers:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
//business logic to get teacher by id 
app.get('/teachers/:id', (req, res) => {
    console.log('here into get teacherById');
    //récupérer l'id
    let teacherId = req.params.id;
    Teacher.findById(teacherId).then(
        (doc) => {
            console.log('here doc ', doc);
            res.json({ findedTeacher: doc })

        });


})

//business logic to get teacherInfo  by id  (for edit)
app.get('/teachers/getTeacherInfos/:id', async (req, res) => {

    //récupérer l'id
    let teacherId = req.params.id;
    let teacher = await Teacher.findById(teacherId) ;
    if(!teacher)
    {
        return res.status(400).json({ msg: "Teacher n'existe pas " });

    }

    let user = await User.findById(teacher.userId) ;
    if(!user)
    {
        return res.status(400).json({ msg: "User n'existe pas " });
 
    }

    let result = {
        "_id" : teacher.id , 
        "firstName":user.firstName ,
        "lastName":user.lastName ,
        "email" : user.email ,
        "speciality":teacher.speciality
    }

    res.json({ findedTeacher: result })
   


})
//business logic to delete selected teacher
app.delete('/teachers/:id', (req, res) => {
    let teacherId = req.params.id;
    Teacher.deleteOne({ _id: teacherId }).then(
        (deleteResponse) => {
            console.log('here delete response', deleteResponse);
            if (deleteResponse.deletedCount == 1) {
                res.json({ message: "Success" })
            } else {
                res.json({ message: "Echec" })
            }

        }
    )

})
//business logic to add  a teacher
app.post('/teachers' , async (req, res) => {
    console.log('here into add Teacher', req.body);
   
   

    try {
        const cryptedPwd = await bcrypt.hash(req.body.password, 10);
        console.log("Here crypted pwd", cryptedPwd);

        req.body.password = cryptedPwd;
        let user = new User(req.body);
        user.active = false ;
        const savedUser = await user.save();
        let dataTeacher = {
            "speciality" :req.body.speciality,
            "userId" : savedUser._id
        }
        let teacher = new Teacher(dataTeacher);
        teacher.save();

        res.json({ msg: 'teacher added with success' });
    } catch (error) {
        console.error('Error saving teacher:', error);
        res.status(500).json({ msg: 'Error adding teacher' });
    }
});
//BL to activate teacher
app.get('/teachers/activate/:id', async(req, res) => {
    //récupérer l'id
    let teacherId = req.params.id;
    Teacher.findById(teacherId).then(
        (teacher) => {
            User.findOne({ _id: teacher.userId }).then((userFound) => {
                userFound.active = true;
                userFound.save();
            });
            res.json({ findedTeacher: teacher })

        });


})

//buisness logic to update teacher
app.put('/teachers', async (req, res) => {
    console.log('here is teacher obj', req.body);
    let teacherId = req.body._id ;
    let firstName = req.body.firstName ;
    let lastName = req.body.lastName ;
    let email = req.body.email ;
    let speciality = req.body.speciality ;

    
    let teacher = await Teacher.findById(teacherId)
    if(!teacher)
    {
        return res.status(400).json({ msg: "Teacher n'existe pas " });
 
    }
    teacher.speciality = speciality ;
    teacher.save() ;

    let user = await User.findById(teacher.userId) ;
    if(!user)
    {
        return res.status(400).json({ msg: "User n'existe pas " });
 
    }
    user.firstName  = firstName ;
    user.lastName  = lastName ;
    user.email  = email ;
    user.save() ;
    res.json({ msg: "success" })
    Teacher.updateOne({ _id: req.body._id }, req.body).then(
        (updateResponse) => {
            console.log("here update response", updateResponse);
            if (updateResponse.nModified == 1) {
                res.json({ msg: "success" })
            } else {
                res.json({ msg: "Error" })
            }

        }
    )

})

// BL to get teacher evaluations 
app.get('/teachers/getEvaluations/:id', async (req, res) => {
    try {
        let userId = req.params.id;
        const teacher = await Teacher.findOne({ userId: userId });
        let teacherId = teacher._id;
        const courses = await Course.find({ teacherId: teacherId });
        let result = [];

        await Promise.all(courses.map(async (c) => {
            let courseEvaluations = [];

            await Promise.all(c.students.map(async (s) => {
                let student = await Student.findById(s.studentId);
                let userS = await User.findById(student.userId);
                let item =  student.coursesEvaluations.find(cE => cE.courseId.toString() === c._id.toString());
               
                courseEvaluations.push({
                    studentId:student._id,
                    studentName: userS.firstName + " " + userS.lastName,
                    note:item.note,
                    evaluation:item.evaluation
                });
            }));

            result.push({
                courseId:c._id,
                courseName: c.nom,
                courseEvaluations: courseEvaluations
            });
        }));

        res.json({ evaluations: result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



// bl to get courses by teacher (courses tab )
app.get('/teachers/coursesByTeacher/:teacherid', async (req, res) => {
    console.log('here into BL : Get All  teacher courses');
    let teacherId = req.params.teacherid;
    let user = await User.findById(teacherId);
    let teacher = await Teacher.findOne({ userId: user._id });
    Course.find({ teacherId: teacher._id }).then(
        (docs) => {
            console.log("Here docs from DB", docs);
            res.json({ coursesTab: docs });
        }
    )

})

// bl to get courses by teacher (for evaluation )
app.get('/teachers/myCourses/:teacherid', async (req, res) => {
    //console.log('here into BL : Get   teacher courses for eval');
    let teacherCourses= [];
    let teacherId = req.params.teacherid;
    let user = await User.findById(teacherId);
    let teacher = await Teacher.findOne({ userId: user._id });
    const courses = await Course.find({ teacherId: teacher._id });
    courses.forEach(c => {
        teacherCourses.push({_id : c._id , nom:c.nom})
    })
    res.json({ coursesTab: teacherCourses });


})

//bl to add new evaluation 
app.post('/teachers/addEvaluation', async (req, res) => {
    console.log('data adding eval', req.body);
    let courseId = req.body.courseid ;
    let studentId = req.body.studentid ;

    let note = req.body.note ;
    let eval = req.body.eval ;
    try {
       let  student  = await Student.findById(studentId) ;
       let element = student.coursesEvaluations.find(cE => cE.courseId.toString() === courseId.toString());
       element.note = note ;
       element.evaluation = eval ;
       await student.save();
        res.json({ msg: 'evalaution added with success' });
    } catch (error) {
        console.error('Error adding  evaluation:', error);
        res.status(500).json({ msg: 'Error adding evaluation' });
    }
});

// BL to get Evaluation 
app.get('/teachers/getEvaluation/:courseid/:studentid', async (req, res) => {
    try {
        let courseId = req.params.courseid;
        let studentId =  req.params.studentid;   

        let student = await Student.findById(studentId);
        let userS = await User.findById(student.userId);
        let course = await Course.findById(courseId) ;

        let item =  student.coursesEvaluations.find(cE => cE.courseId.toString() === courseId.toString());

        let result = {
            courseName:course.nom ,
            studentName:userS.firstName + " " + userS.lastName,
            note:item.note , 
            evaluation:item.evaluation 
        }

        res.json({ evaluation: result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// BL to edit Evaluation
app.put('/teachers/updateEvaluation/:courseid/:studentid', async (req, res) => {
    try {
        const courseId = req.params.courseid;
        const studentId = req.params.studentid;
        const { note, evaluation } = req.body;

        // Find the student by ID
        const student = await Student.findById(studentId);

        // Find the course within the student's coursesEvaluations array
        const courseIndex = student.coursesEvaluations.findIndex(
            (cE) => cE.courseId.toString() === courseId.toString()
        );

        // Update note and evaluation if the course is found
        if (courseIndex !== -1) {
            student.coursesEvaluations[courseIndex].note = note;
            student.coursesEvaluations[courseIndex].evaluation = evaluation;

            // Save the updated student document
            await student.save();

            res.json({ msg: 'Success: Modification saved' });
        } else {
            res.status(404).json({ msg: 'Error: Course not found for the given student' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error: Internal server error' });
    }
});

//business logic
//business logic to get all students
app.get('/students', async (req, res) => {
  
    try {
        console.log('Getting all students...');
    
        // Fetch all students
        const students = await Student.find();
    
        // Map the results to the desired format
        const formattedStudents = await Promise.all(
            students.map(async (student) => {
            // Fetch the corresponding user information based on userId
            const user = await User.findOne({ _id: student.userId });
    
            return {
              _id:student._id,
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              tel:user.tel,
              image:student.image
            };
          })
        );
    
        // Send the formatted result as JSON response
        res.json({ studentsTab: formattedStudents });
      } catch (error) {
        console.error('Error fetching students:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }

})
//business logic to get student by id 
app.get('/students/:id', (req, res) => {
    console.log('here into get studentById');
    //récupérer l'id
    let studentId = req.params.id;
    Student.findById(studentId).then(
        (doc) => {
            console.log('here doc ', doc);
            res.json({ findedStudent: doc })

        });


})
//business logic to delete selected student
app.delete('/students/:id', (req, res) => {
    let studentId = req.params.id;
    Student.deleteOne({ _id: studentId }).then(
        (deleteResponse) => {
            console.log('here delete response', deleteResponse);
            if (deleteResponse.deletedCount == 1) {
                res.json({ message: "Success" })
            } else {
                res.json({ message: "Echec" })
            }

        }
    )

})
//business logic to add  a student
app.post('/students',  upload.single('file') ,async(req, res) => {
    let image = req.file ;
    console.log('file ' ,  req.file)
    console.log('here into add student', req.body);

    try {
        const cryptedPwd = await bcrypt.hash(req.body.password, 10);
        console.log("Here crypted pwd", cryptedPwd);

        req.body.password = cryptedPwd;
        let dataUser = {
                "firstName" : req.body.firstName , 
                "lastName" : req.body.lastName , 
                "role" : req.body.role ,
                "email" :req.body.email,
                "tel":req.body.tel,
                "password":req.body.password 
        }
        let user = new User(dataUser);

        const savedUser = await user.save();
        console.log('data from db', savedUser);
        let dataStudent = {
            "image" :image.path,
            "userId" : savedUser._id,
            "adress":req.body.adress
        }
        let student = new Student(dataStudent);
        student.save();

        res.json({ msg: 'student added with success' });
    } catch (error) {
        console.error('Error saving student:', error);
        res.status(500).json({ msg: 'Error adding student' });
    }
   
});

//buisness logic to update student
app.put('/students', (req, res) => {
    console.log('here is student obj', req.body);
    Student.updateOne({ _id: req.body._id }, req.body).then(
        (updateResponse) => {
            console.log("here update response", updateResponse);
            if (updateResponse.nModified == 1) {
                res.json({ msg: "success" })
            } else {
                res.json({ msg: "Error" })
            }

        }
    )

})
//buisness logic to affect Course à student
app.post('/students/affectCourse/:studentid' , async (req , res) => {
    let studentId = req.params.studentid;
    let courseId = req.body.courseid ;

    let course = await Course.findById(courseId);

    course.students.push({ studentId: studentId});

    await course.save();

    let student = await Student.findById(studentId);
    student.coursesEvaluations.push({
        courseId:courseId,
        note:0,
        evaluation:""
    })

    await student.save();

    res.json({ msg: "affectation effectué avec succès" })

})

//business logic to get student by id 
app.get('/students/getByCourse/:courseid', async (req, res) => {
    console.log('here into get students by course');
    //récupérer l'id
    console.log('here into BL: getStudentsByCourse');
    try {
        let courseId = req.params.courseid;
        let course = await Course.findById(courseId);
        let result = [];

        // Use map instead of forEach to get an array of promises
        let promises = course.students.map(async s => {
            let student = await Student.findById(s.studentId);
            

            let user = await User.findById(student.userId);
           

            result.push({
                '_id': student._id,
                'fullName': user.firstName + " " + user.lastName,
              
            });
        });

        // Wait for all promises to resolve before sending the response
        await Promise.all(promises);

        res.json({ studentTab: result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }


})

// BL to student dashboard
app.get('/students/dashboard/:userid', async (req, res) => {
    try {
        let studentCourseEvals = [];
        let userId = req.params.userid;
      
        let user = await User.findById(userId);
        
        if (!user) {
            return res.status(404).json({ error: "User n'existe pas" });
        }

        let student = await Student.findOne({ userId: user._id });

        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }

        for (const item of student.coursesEvaluations) {
            let course = await Course.findById(item.courseId);

            if (!course) {
                // Handle the case when the course is not found
                console.error(`Course not found for courseId: ${item.courseId}`);
                continue;
            }

            studentCourseEvals.push({
                courseName: course.nom,
                note: item.note,
                evaluation: item.evaluation
            });
        }

        res.json({ studentEvals: studentCourseEvals });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


//business logic
//business logic to add  a parent
app.post('/parents', async (req, res) => {
    console.log('here into add Parent', req.body);

    try {
        const studentUser = await User.findOne({ tel: req.body.telChild, role: 'Student' });
        if (!studentUser) {
            return res.status(400).json({ msg: "Le numéro d'enfant n'existe pas ou n'appartient pas à un étudiant." });
        }
        
        const cryptedPwd = await bcrypt.hash(req.body.password, 10);
        console.log("Here crypted pwd", cryptedPwd);

        req.body.password = cryptedPwd;
        let dataUser = {
            "firstName" : req.body.firstName , 
            "lastName" : req.body.lastName , 
            "role" : req.body.role ,
            "email" :req.body.email,
            "tel":req.body.tel,
            "password":req.body.password 
    }
        let user = new User(dataUser);

        const savedUser = await user.save();
        console.log('data from db', savedUser);
        let dataParent = {
            "telChild" :req.body.telChild,
            "adress":req.body.adress,
            "userId" : savedUser._id
        }
        let parent = new Parent(dataParent);
        parent.save();

        res.json({ msg: 'parent added with success' });
    } catch (error) {
        console.error('Error saving parent:', error);
        res.status(500).json({ msg: 'Error adding parent' });
    }
});

//business logic to get all parents
app.get('/parents/getAll', async (req, res) => {
  
    try {
        console.log('Getting all parents...');
    
        // Fetch all parents
        const parents = await Parent.find();
    
        // Map the results to the desired format
        const formattedParents = await Promise.all(
            parents.map(async (parent) => {
            // Fetch the corresponding user information based on userId
            const user = await User.findOne({ _id: parent.userId });
    
            return {
              _id:parent._id,
              fullName: user.firstName + " " + user.lastName,
             
              email: user.email,
              tel:user.tel,
              telChild:parent.telChild,
              adress:parent.adress
            };
          })
        );
    
        // Send the formatted result as JSON response
        res.json({ parentsTab: formattedParents });
      } catch (error) {
        console.error('Error fetching parents:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }

})

// BL to search course eval and notes of child
app.post('/parents/search', async (req, res) => {
    try {
        let childCourseEvals = [];
        let telChild = req.body.telChild;
        console.log('tel child ', telChild);
        let user = await User.findOne({ tel: telChild });
        
        if (!user) {
            return res.status(404).json({ error: "Numéro telephone n'existe pas" });
        }

        let student = await Student.findOne({ userId: user._id });

        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }

        for (const item of student.coursesEvaluations) {
            let course = await Course.findById(item.courseId);

            if (!course) {
                // Handle the case when the course is not found
                console.error(`Course not found for courseId: ${item.courseId}`);
                continue;
            }

            childCourseEvals.push({
                courseName: course.nom,
                note: item.note,
                evaluation: item.evaluation
            });
        }

        res.json({ childEvals: childCourseEvals });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//pour pouvoir importer l'app (la rendre exportable)
module.exports = app;