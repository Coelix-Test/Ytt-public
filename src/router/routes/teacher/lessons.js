import Lessons from '@/views/teacher/lessons/Lessons';
import TeacherLessonsList from '@/views/teacher/lessons/LessonsList';
import SingleView from "@/views/teacher/lessons/SingleView";
import ShuffleView from "@/views/teacher/lessons/ShuffleView";

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
            component: ShuffleView,
            name: 'teacher-lessons-view',
        },
    ]
}
