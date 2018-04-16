import Vue from 'vue';
import Router from 'vue-router';
import Main from '@/components/Main';
import Task1 from '@/components/Task1';
import Task2 from '@/components/Task2';

Vue.use(Router);

export default new Router({
	routes: [
		{
			path: '/',
			name: 'Main',
			component: Main,
		},
		{
			path: '/Task1',
			name: 'Task1',
			component: Task1,
		},
		{
			path: '/Task2',
			name: 'Task2',
			component: Task2,
		},
	],
});
