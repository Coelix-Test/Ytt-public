import Lessons from '@/views/teacher/lessons/Lessons';
import StudentLessonsList from '@/views/student/lessons/StudentLessonsList';
import StudentPassLesson from '@/views/student/lessons/PassLesson';

export default {
    path: 'lessons',
    component: Lessons,
    children: [
        {
            path: 'all',
            component: StudentLessonsList,
            name: 'student-lessons-all',
        },
        {
            path: ':id',
            component: StudentPassLesson,
            name: 'student-pass-lesson',
        },
    ]
}
