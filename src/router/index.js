import { createRouter, createWebHistory } from 'vue-router';
import CoursesList from '../components/CoursesList.vue';
import CourseDetails from '../components/courses/CourseDetails.vue';

const routes = [
  {
    path: '/',
    component: CoursesList,
    name: 'courses',
  },
  {
    path: '/argentina-identidad',
    component: CourseDetails,
    name: 'argentina-identidad',
    props: { courseId: 'argentinaIdentidad' }
  },
  {
    path: '/maternidad',
    component: CourseDetails,
    name: 'maternidad',
    props: { courseId: 'maternidad' }
  },
  {
    path: '/migracion',
    component: CourseDetails,
    name: 'migracion',
    props: { courseId: 'migracion' }
  },
  {
    path: '/nativo',
    component: CourseDetails,
    name: 'nativo',
    props: { courseId: 'nativo' }
  },
  {
    path: '/universidad-escuela',
    component: CourseDetails,
    name: 'universidad-escuela',
    props: { courseId: 'universidadEscuela' }
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
