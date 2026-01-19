exports.options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'random api doc',
            version: '0.0.0'
        }
    },
    apis: ['./src/routers/*.router.js']
}