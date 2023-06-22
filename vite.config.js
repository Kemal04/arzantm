import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        host: "127.0.0.1",
        port: 3000,

        proxy: {
            "/admin/static": {
                target: "http://95.85.126.113:8080",
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/admin\/static/, "/static"),
            },
            "/api/v1": {
                target: "http://95.85.126.113:8080",
                changeOrigin: true,
            },
        },
    },
});
