import Lessons from '@/views/teacher/lessons/Lessons';
import TeacherLessonsList from '@/views/teacher/lessons/TeacherLessonsList';

export default {
    path: 'lessons',
    component: Lessons,
    children: [
        {
            path: 'all',
            component: TeacherLessonsList,
            name: 'teacher-lessons-all',
        },
    ]
}
