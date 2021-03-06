import Layout from '@/layout/index.vue'
import { useAppStoreWithOut } from '@/store/modules/app'
const appStore = useAppStoreWithOut()

export default {
  path: '/badge',
  component: Layout,
  redirect: '/badge/dot',
  meta: {
    title: '动态标记',
    icon: 'badge-fill-icon',
  },
  children: [
    {
      path: 'dot',
      name: 'badgeDot',
      component: () => import('@/views/badge/index.vue'),
      props: {
        type: 'dot',
      },
      meta: {
        title: '点标记',
        badge: () => appStore.dot,
      },
    },
    {
      path: 'number',
      name: 'badgeNumber',
      component: () => import('@/views/badge/index.vue'),
      props: {
        type: 'number',
      },
      meta: {
        title: '数字标记',
        badge: () => appStore.number,
      },
    },
    {
      path: 'text',
      name: 'badgeText',
      component: () => import('@/views/badge/index.vue'),
      props: {
        type: 'text',
      },
      meta: {
        title: '文字标记',
        badge: () => appStore.text,
      },
    },
  ],
}
