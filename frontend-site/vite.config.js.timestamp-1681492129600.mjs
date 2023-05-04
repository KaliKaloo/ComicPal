// vite.config.js
import react from "file:///C:/Users/pragy/Documents/University%20Work/Dissertation/AI-Tool-For-Comics/frontend-site/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { defineConfig } from "file:///C:/Users/pragy/Documents/University%20Work/Dissertation/AI-Tool-For-Comics/frontend-site/node_modules/vite/dist/node/index.js";
var hash = Math.floor(Math.random() * 9e5) + 1e4;
var vite_config_default = defineConfig({
  build: {
    outDir: "../backend/dist",
    emptyOutDir: true,
    rollupOptions: {
      output: {
        entryFileNames: `[name]` + hash + `.js`,
        chunkFileNames: `[name]` + hash + `.js`,
        assetFileNames: `[name]` + hash + `.[ext]`
      }
    }
  },
  plugins: [react()]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxwcmFneVxcXFxEb2N1bWVudHNcXFxcVW5pdmVyc2l0eSBXb3JrXFxcXERpc3NlcnRhdGlvblxcXFxBSS1Ub29sLUZvci1Db21pY3NcXFxcZnJvbnRlbmQtc2l0ZVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxccHJhZ3lcXFxcRG9jdW1lbnRzXFxcXFVuaXZlcnNpdHkgV29ya1xcXFxEaXNzZXJ0YXRpb25cXFxcQUktVG9vbC1Gb3ItQ29taWNzXFxcXGZyb250ZW5kLXNpdGVcXFxcdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL3ByYWd5L0RvY3VtZW50cy9Vbml2ZXJzaXR5JTIwV29yay9EaXNzZXJ0YXRpb24vQUktVG9vbC1Gb3ItQ29taWNzL2Zyb250ZW5kLXNpdGUvdml0ZS5jb25maWcuanNcIjtpbXBvcnQgcmVhY3QgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXJlYWN0XCI7XHJcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gXCJ2aXRlXCI7XHJcblxyXG5jb25zdCBoYXNoID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogOTAwMDAwKSArIDEwMDAwO1xyXG5cclxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuICAgIGJ1aWxkOiB7XHJcbiAgICAgICAgb3V0RGlyOiAnLi4vYmFja2VuZC9kaXN0JyxcclxuXHRcdGVtcHR5T3V0RGlyOiB0cnVlLFxyXG4gICAgICAgIHJvbGx1cE9wdGlvbnM6IHtcclxuICAgICAgICAgICAgb3V0cHV0OiB7XHJcbiAgICAgICAgICAgICAgICBlbnRyeUZpbGVOYW1lczogYFtuYW1lXWAgKyBoYXNoICsgYC5qc2AsXHJcbiAgICAgICAgICAgICAgICBjaHVua0ZpbGVOYW1lczogYFtuYW1lXWAgKyBoYXNoICsgYC5qc2AsXHJcbiAgICAgICAgICAgICAgICBhc3NldEZpbGVOYW1lczogYFtuYW1lXWAgKyBoYXNoICsgYC5bZXh0XWBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBwbHVnaW5zOiBbcmVhY3QoKV1cclxufSk7XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBc2MsT0FBTyxXQUFXO0FBQ3hkLFNBQVMsb0JBQW9CO0FBRTdCLElBQU0sT0FBTyxLQUFLLE1BQU0sS0FBSyxPQUFPLElBQUksR0FBTSxJQUFJO0FBR2xELElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQ3hCLE9BQU87QUFBQSxJQUNILFFBQVE7QUFBQSxJQUNkLGFBQWE7QUFBQSxJQUNQLGVBQWU7QUFBQSxNQUNYLFFBQVE7QUFBQSxRQUNKLGdCQUFnQixXQUFXLE9BQU87QUFBQSxRQUNsQyxnQkFBZ0IsV0FBVyxPQUFPO0FBQUEsUUFDbEMsZ0JBQWdCLFdBQVcsT0FBTztBQUFBLE1BQ3RDO0FBQUEsSUFDSjtBQUFBLEVBQ0o7QUFBQSxFQUNBLFNBQVMsQ0FBQyxNQUFNLENBQUM7QUFDckIsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K