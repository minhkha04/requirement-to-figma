// utils/json.util.js
export function safeParseJsonArray(raw) {
    if (!raw || typeof raw !== "string") return [];

    try {
        // 1️⃣ Bỏ khung ```json ... ```
        const fenced = raw.match(/```(?:json)?\s*([\s\S]*?)```/i);
        let cleaned = fenced ? fenced[1] : raw.trim();

        // 2️⃣ Chuẩn hóa dấu ngoặc kép đặc biệt
        cleaned = cleaned
            .replace(/[\u201C\u201D\u201E\u201F\u2033\u2036]/g, '"')
            .replace(/[\u2018\u2019\u201B\u2032\u2035]/g, "'");

        // 3️⃣ Cắt phần [ ... ]
        const bracket = cleaned.match(/\[[\s\S]*\]/);
        let jsonCandidate = bracket ? bracket[0].trim() : cleaned;

        // 4️⃣ Thử parse nhiều lần (tránh double-encode)
        let parsed;
        for (let i = 0; i < 3; i++) {
            if (typeof jsonCandidate === "string") {
                try {
                    parsed = JSON.parse(jsonCandidate);
                    jsonCandidate = parsed;
                } catch {
                    break;
                }
            }
        }

        // 5️⃣ Nếu kết quả là mảng thì xử lý
        if (Array.isArray(parsed)) {
            return parsed
                .map(x => (typeof x === "string" ? x.trim() : x))
                .filter(Boolean);
        }

        // 6️⃣ Nếu không, trả về rỗng
        return [];
    } catch (e) {
        console.warn("safeParseJsonArray failed:", e.message, { raw });
        return [];
    }
}

export function safeParseJson(text) {
    if (!text || typeof text !== "string") return null;

    try {
        // 1️⃣ Loại bỏ phần ```json ... ``` nếu có
        const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/i);
        let cleaned = fenced ? fenced[1] : text.trim();

        // 2️⃣ Chuẩn hóa dấu ngoặc kép đặc biệt (nếu AI trả về kiểu “…”)
        cleaned = cleaned
            .replace(/[\u201C\u201D\u201E\u201F\u2033\u2036]/g, '"') // dấu ngoặc kép cong
            .replace(/[\u2018\u2019\u201B\u2032\u2035]/g, "'");     // dấu nháy đơn cong

        // 3️⃣ Parse JSON
        return JSON.parse(cleaned);
    } catch (err) {
        console.error("❌ Lỗi parse JSON:", err);
        return null;
    }
}