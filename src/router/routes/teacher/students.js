import Students from "@/views/teacher/students/Students";
import StudentsList from "@/views/teacher/students/StudentsList";
import StudentsLessonList from "@/views/teacher/students/StudentsLessonList";

export default {
    path: 'students',
    component: Students,
    children: [
        {
            path: 'all',
            component: StudentsList,
            name: 'teacher-students-all',
        },
        {
            path: ':id/lessons',
            name: 'teacher-students-lesson-list',
            component: StudentsLessonList,
        }
    ]
}