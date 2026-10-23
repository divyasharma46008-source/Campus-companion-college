// ===================================
// CAMPUS COMPANION - JAVASCRIPT
// ===================================

function getData(key, fallback = []) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : fallback;
    } catch (error) {
        return fallback;
    }
}

function saveData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

// ===================================
// TIMETABLE
// ===================================

const subjectInput = document.getElementById("subjectInput");
const timeInput = document.getElementById("timeInput");
const addTimetable = document.getElementById("addTimetable");
const timetableList = document.getElementById("timetableList");

let timetable = getData("campusTimetable");

function showTimetable() {
    timetableList.replaceChildren();

    timetable.forEach((item, index) => {
        const li = document.createElement("li");
        const text = document.createElement("span");
        const button = document.createElement("button");

        text.textContent = item.subject + " — " + item.time;
        button.textContent = "Delete";

        button.onclick = function () {
            timetable.splice(index, 1);
            saveData("campusTimetable", timetable);
            showTimetable();
        };

        li.append(text, button);
        timetableList.appendChild(li);
    });
}

addTimetable.addEventListener("click", function () {
    const subject = subjectInput.value.trim();
    const time = timeInput.value.trim();

    if (!subject || !time) {
        alert("Please enter subject name and class time.");
        return;
    }

    timetable.push({ subject, time });
    saveData("campusTimetable", timetable);

    subjectInput.value = "";
    timeInput.value = "";

    showTimetable();
});

// ===================================
// ASSIGNMENTS
// ===================================

const assignmentInput = document.getElementById("assignmentInput");
const assignmentDate = document.getElementById("assignmentDate");
const addAssignment = document.getElementById("addAssignment");
const assignmentList = document.getElementById("assignmentList");

let assignments = getData("campusAssignments");

function showAssignments() {
    assignmentList.replaceChildren();

    assignments.forEach((item, index) => {
        const li = document.createElement("li");
        const text = document.createElement("span");
        const button = document.createElement("button");

        text.textContent = item.date
            ? item.name + " — Due: " + item.date
            : item.name;

        button.textContent = "Delete";

        button.onclick = function () {
            assignments.splice(index, 1);
            saveData("campusAssignments", assignments);
            showAssignments();
        };

        li.append(text, button);
        assignmentList.appendChild(li);
    });
}

addAssignment.addEventListener("click", function () {
    const name = assignmentInput.value.trim();
    const date = assignmentDate.value;

    if (!name) {
        alert("Please enter an assignment name.");
        return;
    }

    assignments.push({ name, date });
    saveData("campusAssignments", assignments);

    assignmentInput.value = "";
    assignmentDate.value = "";

    showAssignments();
});

// ===================================
// COLLEGE NOTICES
// ===================================

const noticeInput = document.getElementById("noticeInput");
const addNotice = document.getElementById("addNotice");
const noticeList = document.getElementById("noticeList");

let notices = getData("campusNotices");

function showNotices() {
    noticeList.replaceChildren();

    notices.forEach((notice, index) => {
        const li = document.createElement("li");
        const text = document.createElement("span");
        const button = document.createElement("button");

        text.textContent = "📢 " + notice;
        button.textContent = "Delete";

        button.onclick = function () {
            notices.splice(index, 1);
            saveData("campusNotices", notices);
            showNotices();
        };

        li.append(text, button);
        noticeList.appendChild(li);
    });
}

addNotice.addEventListener("click", function () {
    const notice = noticeInput.value.trim();

    if (!notice) {
        alert("Please enter a notice.");
        return;
    }

    notices.push(notice);
    saveData("campusNotices", notices);

    noticeInput.value = "";

    showNotices();
});

// ===================================
// QUICK NOTES
// ===================================

const noteInput = document.getElementById("noteInput");
const saveNote = document.getElementById("saveNote");
const notesList = document.getElementById("notesList");

let notes = getData("campusNotes");

function showNotes() {
    notesList.replaceChildren();

    notes.forEach((note, index) => {
        const card = document.createElement("div");
        const text = document.createElement("p");
        const button = document.createElement("button");

        card.className = "note-card";
        text.textContent = note;
        button.textContent = "Delete Note";

        button.onclick = function () {
            notes.splice(index, 1);
            saveData("campusNotes", notes);
            showNotes();
        };

        card.append(text, button);
        notesList.appendChild(card);
    });
}

saveNote.addEventListener("click", function () {
    const note = noteInput.value.trim();

    if (!note) {
        alert("Please write a note first.");
        return;
    }

    notes.push(note);
    saveData("campusNotes", notes);

    noteInput.value = "";

    showNotes();
});

// ===================================
// ATTENDANCE TRACKER
// ===================================

const attendanceSubject = document.getElementById("attendanceSubject");
const totalClasses = document.getElementById("totalClasses");
const attendedClasses = document.getElementById("attendedClasses");
const calculateAttendance = document.getElementById("calculateAttendance");
const attendanceResult = document.getElementById("attendanceResult");
const attendanceList = document.getElementById("attendanceList");

let attendanceRecords = getData("campusAttendance");

function showAttendance() {
    attendanceList.replaceChildren();

    attendanceRecords.forEach((record, index) => {
        const li = document.createElement("li");
        const text = document.createElement("span");
        const button = document.createElement("button");

        text.textContent =
            record.subject + ": " +
            record.attended + "/" + record.total +
            " classes (" + record.percentage + "%)";

        button.textContent = "Delete";

        button.onclick = function () {
            attendanceRecords.splice(index, 1);
            saveData("campusAttendance", attendanceRecords);
            showAttendance();
        };

        li.append(text, button);
        attendanceList.appendChild(li);
    });
}

calculateAttendance.addEventListener("click", function () {
    const subject = attendanceSubject.value.trim();
    const total = Number(totalClasses.value);
    const attended = Number(attendedClasses.value);

    if (
        !subject ||
        totalClasses.value === "" ||
        attendedClasses.value === "" ||
        !Number.isInteger(total) ||
        !Number.isInteger(attended) ||
        total <= 0 ||
        attended < 0 ||
        attended > total
    ) {
        attendanceResult.textContent = "Please enter valid class details.";
        attendanceResult.className = "result-box warning";
        return;
    }

    const percentage = ((attended / total) * 100).toFixed(2);

    attendanceRecords.push({
        subject: subject,
        total: total,
        attended: attended,
        percentage: percentage
    });

    saveData("campusAttendance", attendanceRecords);

    attendanceResult.textContent =
        subject + " attendance: " + percentage + "%";

    attendanceResult.className =
        percentage >= 75 ? "result-box success" : "result-box warning";

    attendanceSubject.value = "";
    totalClasses.value = "";
    attendedClasses.value = "";

    showAttendance();
});

// ===================================
// EXAM COUNTDOWN
// ===================================

const examName = document.getElementById("examName");
const examDate = document.getElementById("examDate");
const saveExam = document.getElementById("saveExam");
const examResult = document.getElementById("examResult");

let savedExam = getData("campusExam", null);

function showExam() {
    if (!savedExam) {
        examResult.textContent = "Save your upcoming exam date to see the countdown.";
        return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const target = new Date(savedExam.date + "T00:00:00");
    const days = Math.round((target - today) / 86400000);

    if (days > 0) {
        examResult.textContent =
            savedExam.name + ": " + days + " day(s) left! 📚";
    } else if (days === 0) {
        examResult.textContent =
            savedExam.name + ": Your exam is today! Good luck! 🎯";
    } else {
        examResult.textContent =
            savedExam.name + ": This exam date has passed.";
    }
}

saveExam.addEventListener("click", function () {
    const name = examName.value.trim();
    const date = examDate.value;

    if (!name || !date) {
        alert("Please enter the exam name and date.");
        return;
    }

    const target = new Date(date + "T00:00:00");
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (target < today) {
        alert("Please select today or a future date.");
        return;
    }

    savedExam = { name: name, date: date };
    saveData("campusExam", savedExam);

    examName.value = "";
    examDate.value = "";

    showExam();
});

// ===================================
// LOAD SAVED DATA
// ===================================

showTimetable();
showAssignments();
showNotices();
showNotes();
showAttendance();
showExam();

console.log("Campus Companion is ready!");