class Subject {
    constructor(public name: string, public color: Color, public teacher: string) {
    };
}

class Color {
    public rgbString: string;
    constructor(public red: number, public green: number, public blue: number) {
        this.rgbString = "rgb(" + red + ", " + green + ", " + blue + ")";
    }
}

class Lesson {
    constructor(public subject: Subject, public day: DaysOfWeek, public timeOfDay : string, public length : string) {
    }
}

enum DaysOfWeek {
    Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday
}
//#region Advanced Weekly Time Table
var height : number = 2500;
var width : number = window.innerWidth;
window.onresize = function() {
    width = window.innerWidth;
    new WeeklyTimeTable(lessons);
    
};

class WeeklyTimeTable {
    public div : HTMLElement;
    public columns : WeeklyTimeTableColumn[] = new Array<WeeklyTimeTableColumn>();

    constructor (lessons : Lesson[]) {
        this.div = document.getElementsByClassName('weeklyTimeTable')[0] as HTMLElement;
        while (this.div.lastChild) {
            this.div.removeChild(this.div.lastChild);
        }
        this.div.style.height = height+'px';
        this.div.style.width = width+'px';

        for (var i = 0; i < 8; i++) {
            this.columns.push(
                new WeeklyTimeTableColumn(width / 8 * i)
            );
            this.div.appendChild(this.columns[i].div);
        }
        
        lessons.forEach(lesson => {
            this.columns[lesson.day + 1].setLesson(lesson);
        });
    }
}

class WeeklyTimeTableColumn {
    public div: HTMLElement;
    public weeklyTimeTableLessons : WeeklyTimeTableLesson[] = new Array<WeeklyTimeTableLesson>();
    constructor (offset : number) {
        this.div = document.createElement('div');
        this.div.style.position = 'absolute';
        this.div.style.height = height+'px';
        this.div.style.width = width/8+'px';
        this.div.style.marginLeft = offset + 'px';
        this.div.style.display = 'inline-block';
    }

    setLesson(lesson : Lesson) {
        var timeTableLesson = (new WeeklyTimeTableLesson(lesson));
        this.weeklyTimeTableLessons.push(timeTableLesson);
        this.div.appendChild(timeTableLesson.div);
    }
}

class WeeklyTimeTableLesson {
    public div: HTMLElement;

    constructor (public lesson: Lesson) {
        this.div = document.createElement('div');
        this.div.style.position = 'absolute';
        this.div.style.padding = '10px';
        this.div.style.webkitBoxSizing = 'border-box';
        this.div.classList.add('weeklyTimeTableLesson');
        this.div.style.width = 100+'%';
        this.div.style.marginTop = height * this.calculateVerticalOffset() + 'px';
        this.div.style.height = height * this.calculateHeight() + 'px';
        this.div.style.backgroundColor = lesson.subject.color.rgbString;
        var lessonColor = lesson.subject.color;
        var darkerColor = new Color(Math.round(lessonColor.red * .75), Math.round(lessonColor.green * .75), Math.round(lessonColor.blue * .75));
        this.div.style.borderColor = darkerColor.rgbString;

        this.div.innerHTML = lesson.subject.teacher + "<br\> <p class=\"subjectname\">" + lesson.subject.name + " </p>";
    }
    
    calculateVerticalOffset() : number {
        var hourMinutes = this.lesson.timeOfDay.split(':');
        var hour = +hourMinutes[0] + (+hourMinutes[1] / 60);

        return hour / 24;
    }

    calculateHeight() : number {
        var hourMinutes = this.lesson.length.split(':');
        var hour = +hourMinutes[0] + (+hourMinutes[1] / 60);

        return hour / 24;
    }
}

//#endregion

var subjects = { math: new Subject("Math", new Color(255,0,0), "Concetta Lanza"),
                 physics: new Subject("Physics", new Color(0, 255, 255), "Francesca Tortorelli"),
                 art: new Subject("Art", new Color(0, 0, 255), "Degiampietro Nicola"),
                 religion: new Subject("Religion", new Color(66, 244, 244), "Ruggero Bergamo"),
                 pe: new Subject("P.E.", new Color(85, 239, 23), "Nadia Sala"),
                 latin: new Subject("Latin", new Color(215, 66, 244), "Barbara Corradini"),
                 italian: new Subject("Italian", new Color(193, 244, 65), "Barbara Corradini"),
                 history: new Subject("History", new Color(244, 133, 65), "Pietro Alotto"),
                 science: new Subject("Natural Science", new Color(244, 65, 115), "Andrea Acquisti"),
                 english: new Subject("English", new Color(60, 50, 120), "Donata Iellici"),
                 philosophy: new Subject("Philosophy", new Color(60,130,40), "Pietro Alotto")}

var lessons : Lesson[] = [new Lesson(subjects.math, DaysOfWeek.Monday, '7:55', '0:50'),
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
