import { defineConfig } from "astro-imagetools/config";

export default defineConfig({
    loading: "lazy",
    objectFit: "cover",
    objectPosition: "50% 50%",
    layout: "fill"
});