"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseCorsWhitelist = parseCorsWhitelist;
function parseCorsWhitelist(raw) {
    return raw
        .split(/\s+/g)
        .map(url => url.replace(/\/+$/, ''))
        .filter(Boolean);
}
//# sourceMappingURL=parse-cors-whitelist.js.map