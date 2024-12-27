export default [
    {
        path: '/camera',
        name: 'camera',
        component: () => import('@/views/Camera.vue'),
        meta: { title: '相机' }
    },
    {
        path: '/lens',
        name: 'lens',
        component: () => import('@/views/Lens.vue'),
        meta: { title: '镜头' }
    },
    {
        path: '/brands/:brandId',
        name: 'brandDetail',
        component: () => import('@/views/BrandDetail.vue'),
        meta: { title: '品牌详情' }
    }
]