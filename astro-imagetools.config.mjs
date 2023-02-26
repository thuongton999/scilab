import { defineConfig } from "astro-imagetools/config";

export default defineConfig({
    loading: "lazy",
    format: ["webp", "jpeg", "jpg", "gif"],
    fallbackFormat: "png",
    objectFit: "cover",
    objectPosition: "50% 50%",
    layout: "fill"
});