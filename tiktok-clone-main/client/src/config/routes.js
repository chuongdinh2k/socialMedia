const routes = {
    home: '/',
    following: '/following',
    profile: '/:nickname',
    video: '/:nickname/video/:id',
    upload: '/upload',
    live: '/live',
    music: '/music/:name-:id',
    tag: '/tag/:name',
    login: '/login',
    loginPhoneAndEmail: '/login/phone-or-email',
    register: '/register',
    registerPhoneAndEmail: '/register/phone-or-email',
    forgetPassword: '/login/forget-password',
    dashboard: '/admin/dashboard',
    manageUser: '/admin/dashboard/manageUser',
    manageAccount: '/admin/dashboard/manageAccount',
    manageMusic: '/admin/dashboard/manageMusic',
    manageTrendy: '/admin/dashboard/manageTrendy',
    manageReport: '/admin/dashboard/manageReport',
    manageTotal: '/admin/dashboard/manageTotal',
    manageVideo: '/admin/dashboard/manageVideo',
}

export default routes;