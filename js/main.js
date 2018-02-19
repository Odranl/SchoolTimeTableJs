var Subject = /** @class */ (function () {
    function Subject(name, color, teacher) {
        this.name = name;
        this.color = color;
        this.teacher = teacher;
    }
    ;
    return Subject;
}());
var Color = /** @class */ (function () {
    function Color(red, green, blue) {
        this.red = red;
        this.green = green;
        this.blue = blue;
        this.rgbString = "rgb(" + red + ", " + green + ", " + blue + ")";
    }
    return Color;
}());
var Lesson = /** @class */ (function () {
    function Lesson(subject, day, timeOfDay, length) {
        this.subject = subject;
        this.day = day;
        this.timeOfDay = timeOfDay;
        this.length = length;
    }
    return Lesson;
}());
var DaysOfWeek;
(function (DaysOfWeek) {
    DaysOfWeek[DaysOfWeek["Monday"] = 0] = "Monday";
    DaysOfWeek[DaysOfWeek["Tuesday"] = 1] = "Tuesday";
    DaysOfWeek[DaysOfWeek["Wednesday"] = 2] = "Wednesday";
    DaysOfWeek[DaysOfWeek["Thursday"] = 3] = "Thursday";
    DaysOfWeek[DaysOfWeek["Friday"] = 4] = "Friday";
    DaysOfWeek[DaysOfWeek["Saturday"] = 5] = "Saturday";
    DaysOfWeek[DaysOfWeek["Sunday"] = 6] = "Sunday";
})(DaysOfWeek || (DaysOfWeek = {}));
//#region Advanced Weekly Time Table
var height = 2500;
var width = window.innerWidth;
window.onresize = function () {
    width = window.innerWidth;
    new WeeklyTimeTable(lessons);
};
var WeeklyTimeTable = /** @class */ (function () {
    function WeeklyTimeTable(lessons) {
        var _this = this;
        this.columns = new Array();
        this.div = document.getElementsByClassName('weeklyTimeTable')[0];
        while (this.div.lastChild) {
            this.div.removeChild(this.div.lastChild);
        }
        this.div.style.height = height + 'px';
        this.div.style.width = width + 'px';
        for (var i = 0; i < 8; i++) {
            this.columns.push(new WeeklyTimeTableColumn(width / 8 * i));
            this.div.appendChild(this.columns[i].div);
        }
        lessons.forEach(function (lesson) {
            _this.columns[lesson.day + 1].setLesson(lesson);
        });
    }
    return WeeklyTimeTable;
}());
var WeeklyTimeTableColumn = /** @class */ (function () {
    function WeeklyTimeTableColumn(offset) {
        this.weeklyTimeTableLessons = new Array();
        this.div = document.createElement('div');
        this.div.style.position = 'absolute';
        this.div.style.height = height + 'px';
        this.div.style.width = width / 8 + 'px';
        this.div.style.marginLeft = offset + 'px';
        this.div.style.display = 'inline-block';
    }
    WeeklyTimeTableColumn.prototype.setLesson = function (lesson) {
        var timeTableLesson = (new WeeklyTimeTableLesson(lesson));
        this.weeklyTimeTableLessons.push(timeTableLesson);
        this.div.appendChild(timeTableLesson.div);
    };
    return WeeklyTimeTableColumn;
}());
var WeeklyTimeTableLesson = /** @class */ (function () {
    function WeeklyTimeTableLesson(lesson) {
        this.lesson = lesson;
        this.div = document.createElement('div');
        this.div.style.position = 'absolute';
        this.div.style.padding = '10px';
        this.div.style.webkitBoxSizing = 'border-box';
        this.div.classList.add('weeklyTimeTableLesson');
        this.div.style.width = 100 + '%';
        this.div.style.marginTop = height * this.calculateVerticalOffset() + 'px';
        this.div.style.height = height * this.calculateHeight() + 'px';
        this.div.style.backgroundColor = lesson.subject.color.rgbString;
        var lessonColor = lesson.subject.color;
        var darkerColor = new Color(Math.round(lessonColor.red * .75), Math.round(lessonColor.green * .75), Math.round(lessonColor.blue * .75));
        this.div.style.borderColor = darkerColor.rgbString;
        this.div.innerHTML = lesson.subject.teacher + "<br\> <p class=\"subjectname\">" + lesson.subject.name + " </p>";
    }
    WeeklyTimeTableLesson.prototype.calculateVerticalOffset = function () {
        var hourMinutes = this.lesson.timeOfDay.split(':');
        var hour = +hourMinutes[0] + (+hourMinutes[1] / 60);
        return hour / 24;
    };
    WeeklyTimeTableLesson.prototype.calculateHeight = function () {
        var hourMinutes = this.lesson.length.split(':');
        var hour = +hourMinutes[0] + (+hourMinutes[1] / 60);
        return hour / 24;
    };
    return WeeklyTimeTableLesson;
}());
//#endregion
var subjects = { math: new Subject("Math", new Color(255, 0, 0), "Concetta Lanza"),
    physics: new Subject("Physics", new Color(0, 255, 255), "Francesca Tortorelli"),
    art: new Subject("Art", new Color(0, 0, 255), "Degiampietro Nicola"),
    religion: new Subject("Religion", new Color(66, 244, 244), "Ruggero Bergamo"),
    pe: new Subject("P.E.", new Color(85, 239, 23), "Nadia Sala"),
    latin: new Subject("Latin", new Color(215, 66, 244), "Barbara Corradini"),
    italian: new Subject("Italian", new Color(193, 244, 65), "Barbara Corradini"),
    history: new Subject("History", new Color(244, 133, 65), "Pietro Alotto"),
    science: new Subject("Natural Science", new Color(244, 65, 115), "Andrea Acquisti"),
    english: new Subject("English", new Color(60, 50, 120), "Donata Iellici"),
    philosophy: new Subject("Philosophy", new Color(60, 130, 40), "Pietro Alotto") };
var lessons = [new Lesson(subjects.math, DaysOfWeek.Monday, '7:55', '0:50'),
    new Lesson(subjects.physics, DaysOfWeek.Monday, '8:45', '0:50'),
    new Lesson(subjects.art, DaysOfWeek.Monday, '9:35', '0:50'),
    new Lesson(subjects.religion, DaysOfWeek.Monday, '10:35', '0:50'),
    new Lesson(subjects.pe, DaysOfWeek.Monday, '11:25', '0:50'),
    new Lesson(subjects.latin, DaysOfWeek.Tuesday, '7:55', '0:50'),
    new Lesson(subjects.physics, DaysOfWeek.Tuesday, '8:45', '0:50'),
    new Lesson(subjects.history, DaysOfWeek.Tuesday, '9:35', '0:50'),
    new Lesson(subjects.math, DaysOfWeek.Tuesday, '10:35', '0:50'),
    new Lesson(subjects.science, DaysOfWeek.Tuesday, '11:25', '0:50'),
    new Lesson(subjects.pe, DaysOfWeek.Tuesday, '12:20', '0:50'),
    new Lesson(subjects.science, DaysOfWeek.Wednesday, '7:55', '0:50'),
    new Lesson(subjects.english, DaysOfWeek.Wednesday, '8:45', '0:50'),
    new Lesson(subjects.italian, DaysOfWeek.Wednesday, '9:35', '0:50'),
    new Lesson(subjects.history, DaysOfWeek.Wednesday, '10:35', '0:50'),
    new Lesson(subjects.philosophy, DaysOfWeek.Wednesday, '11:25', '0:50'),
    new Lesson(subjects.italian, DaysOfWeek.Thursday, '7:55', '0:50'),
    new Lesson(subjects.latin, DaysOfWeek.Thursday, '8:45', '0:50'),
    new Lesson(subjects.math, DaysOfWeek.Thursday, '9:35', '0:50'),
    new Lesson(subjects.math, DaysOfWeek.Thursday, '10:35', '0:50'),
    new Lesson(subjects.english, DaysOfWeek.Thursday, '11:25', '0:50'),
    new Lesson(subjects.latin, DaysOfWeek.Friday, '7:55', '0:50'),
    new Lesson(subjects.science, DaysOfWeek.Friday, '8:45', '0:50'),
    new Lesson(subjects.physics, DaysOfWeek.Friday, '9:35', '0:50'),
    new Lesson(subjects.english, DaysOfWeek.Friday, '10:35', '0:50'),
    new Lesson(subjects.math, DaysOfWeek.Friday, '11:25', '0:50'),
    new Lesson(subjects.history, DaysOfWeek.Friday, '12:20', '0:50'),
    new Lesson(subjects.art, DaysOfWeek.Saturday, '7:55', '0:50'),
    new Lesson(subjects.italian, DaysOfWeek.Saturday, '8:45', '0:50'),
    new Lesson(subjects.latin, DaysOfWeek.Saturday, '9:35', '0:50'),
    new Lesson(subjects.science, DaysOfWeek.Saturday, '10:35', '0:50'),
    new Lesson(subjects.philosophy, DaysOfWeek.Saturday, '11:25', '0:50'),
];
new WeeklyTimeTable(lessons);
//# sourceMappingURL=main.js.map