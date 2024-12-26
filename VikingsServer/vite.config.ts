import {defineConfig, loadEnv} from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

export default ({mode}:{mode:string}) => {
    process.env = loadEnv(mode, process.cwd());

    return defineConfig({
        base: "/WEBF_IU5_BMSTU",
        server: {
            host: true,
            port: 3000,
            proxy: {
                "/api": {
                    target: process.env.VITE_API_URL
                }
            },
        },
        plugins: [
            react(),
            tsconfigPaths()
        ]
    })
}



// import {defineConfig, loadEnv} from 'vite'
// import react from '@vitejs/plugin-react'
// import tsconfigPaths from 'vite-tsconfig-paths'

// export default ({mode}:{mode:string}) => {
//     process.env = loadEnv(mode, process.cwd());

//     return defineConfig({
//         base: "/WEBF_IU5_BMSTU",
//         server: {
//             host: true,
//             port: 3000,
//             proxy: {
//                 "/api": {
//                     target: "http://172.16.87.217:8000"
//                 }
//             },
//         },
//         plugins: [
//             react(),
//             tsconfigPaths()
//         ]
//     })
// }

