import {createRouter, createWebHistory} from "vue-router";
import Home from '../pages/HomePage.vue';
import Todos from '../pages/todos/TodosPage.vue';
import TodoDetail from "@/pages/todos/TodoDetailPage.vue";
import TodoCreate from "@/pages/todos/TodoCreatePage.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home,
        },
        {
            path: '/todos',
            name: 'Todos',
            component: Todos,
        },
        {
            path: '/todos/create',
            name: 'TodoCreate',
            component: TodoCreate,
        },
        {
            path: '/todos/:id',
            name: 'Todo',
            component: TodoDetail,
        },
    ],
});

export default router;