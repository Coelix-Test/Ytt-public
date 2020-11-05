import Lessons from '@/views/teacher/lessons/Lessons';
import TeacherLessonsList from '@/views/teacher/lessons/LessonsList';
import SingleView from "@/views/teacher/lessons/SingleView";

export default {
    path: 'lessons',
    component: Lessons,
    children: [
        {
            path: 'all',
            component: TeacherLessonsList,
            name: 'teacher-lessons-all',
        },
        {
            path: ':id',
            component: SingleView,
            name: 'teacher-lessons-view',
        },
    ]
}
