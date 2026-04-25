"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSlugFromText = createSlugFromText;
const generate_random_suffix_1 = require("./generate-random-suffix");
const slugify_1 = require("./slugify");
function createSlugFromText(text) {
    const safeText = text || '';
    const slug = (0, slugify_1.slugify)(safeText);
    return `${slug}-${(0, generate_random_suffix_1.generateRandomSuffix)()}`;
}
//# sourceMappingURL=create-slug-from-text.js.map