"use strict";

//Question 3a:
function Student(name, firstName, id){
    this.name = name,
    this.firstName = firstName,
    this.id = id,

    //Question 3b:
    this.print = function(){
        console.log("student: " + this.name + ", " + this.firstName + ", " + this.id);
        //return ("student: " + this.name + ", " + this.firstName + ", " + this.id);
    };
}

//Question 3c:
function ForeignStudent(name, firstName, id, nationalite){
    Student.call(this, name, firstName, id),
    this.nationalite = nationalite,

    this.print = function(){
        //console.log(ForeignStudent.prototype.print.apply(this, [this.name, this.firstName, this.id]) + ", " + this.nationalite);
        console.log("student: " + this.name + ", " + this.firstName + ", " + this.id + ", " + this.nationalite);
    }
}
ForeignStudent.prototype = new Student();

//Question 3d:
function test1(){
    var student = new Student("Dupond", "Jean", 1835); //console.log(student);
    student.print();

    var frStudent = new ForeignStudent("Doe", "John", 432, "American"); //console.log(frStudent);
    frStudent.print();
}
test1();

//Question 3e:
function Promotion(){
    this.listOfStudents = [];

    this.add = function(stu){
        this.listOfStudents.push(stu);
        console.log("Item added");
    };

    this.remove = function(id){
        var findId = this.listOfStudents.map(function(s) {return s.id;}).indexOf(id);
        if(findId === -1) console.log("No item matched!");
        else {
            this.listOfStudents.splice(findId, 1);
            console.log("Item removed");
        }
    };

    this.list = function(){
        this.listOfStudents.map(function(everyStudent){ everyStudent.print(); });
    };

    this.saveToFile = function(filePath) {
        var data = JSON.stringify(this.listOfStudents);
        var jsonfile = require("fs");
        jsonfile.writeFileSync(filePath, data, "utf-8");
        console.log("File saved");
    };

    this.readFromFile = function(filePath) {
        var jsonfile = require("fs");
        var data = jsonfile.readFileSync(filePath);
        var objArray = JSON.parse(data);
        var readData = objArray.map(function(o) {
            if(typeof o.nationalite === "undefined") {
                var newStudent = new Student(o.name, o.firstName, o.id);
                newStudent.print();
            }
            else {
                var newStudent = new ForeignStudent(o.name, o.firstName, o.id, o.nationalite);
                newStudent.print();
            }
            return newStudent;
        });
        console.log("File Read");
        return readData;
    };
}

function test2(){
    var promo = new Promotion;
    for(var i = 0; i <= 10; i++){
        promo.add(new Student("fisrtName" + i.toString(), "Name" + i.toString(), 1835 + i)); }
    for(var i = 11; i < 21; i++){
        promo.add(new ForeignStudent("fisrtName" + i.toString(), "Name" + i.toString(), 1835 + i, "American")); }
    promo.list();
    promo.remove(1835);
    promo.list();
    console.log();
    console.log("Test file function:");
    promo.saveToFile("test_out.json");
    var dataReadFromFile = promo.readFromFile("test_in.json");
    dataReadFromFile.map(function(o){promo.add(o);});
    promo.list();
}
test2();

