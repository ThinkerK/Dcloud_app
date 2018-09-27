//动态引入router
module.exports = process.env.NODE_ENV == 'development'?
file => () => import('@/views/' + file + '.vue'):
file => require('@/views/' + file + '.vue').default 