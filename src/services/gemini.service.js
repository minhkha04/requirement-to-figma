import GeminiRepository from "../repositories/gemini.repository.js";
import { safeParseJsonArray } from "../utils/json.util.js";

const MODEL = 'gemini-2.5-flash';

const GeminiService = {
    async extractFactsFromTurn(userMessage, aiResponse) {
        const systemPrompt = `
            Hãy đọc đoạn hội thoại sau và trích ra danh sách ngắn gọn các "quyết định" người dùng đã xác nhận hoặc mô tả cụ thể.
            Chỉ trả về kết quả ở dạng JSON array, ví dụ:
            ["Form căn giữa", "Không cần logo", "Tông màu sáng", "Không có nút đăng ký"].
            Nếu không có facts mới, trả về [].
        `;

        const text = `
            AI: ${aiResponse}
            User: ${userMessage}
        `;
        console.log("Extracting facts from turn:");
        console.log(text);
        const response = await GeminiRepository.generateContent(MODEL, text, systemPrompt);
        console.log("Extracted facts response:");
        console.log(response);

        return safeParseJsonArray(response);
    },

    async generateFollowupQuestions(goal, userMessage, facts = [],  conversationId) {
        let factsText = facts.length ? facts.join("; ") : "Chưa có";
        userMessage = userMessage + 'và các thông tin đã có: ' + factsText;
        console.log("Generating follow-up questions with facts:", facts);
        const systemPrompt = `
            Bạn là một **Business Analyst (BA)** chuyên thu thập yêu cầu để sinh layout Figma dạng JSON (phục vụ cho hàm generateFigmaPrompt).

            Ngữ cảnh:
            - 🎯 Mục tiêu dự án: "${goal}".
            - 📋 Các thông tin đã có (facts): ${factsText}.

            ---

            ## 🧠 Nhiệm vụ
            Nhiệm vụ của bạn là dựa vào câu trả lời mới của người dùng để **hỏi người dùng thêm các thông tin cần thiết để hoàn thiện layout JSON Figma**, bao gồm:
            - Thành phần giao diện (FRAME, TEXT, RECTANGLE, BUTTON, IMAGE, ICON...)
            - Nội dung hiển thị (text cụ thể, placeholder, nhãn nút...)
            - Bố cục (thứ tự, căn giữa, kích thước tương đối)
            - Màu sắc, font, phong cách
            - Hành vi tương tác (hover, click, lỗi, chuyển trang)
            - Thông tin thương hiệu (logo, màu chủ đạo, font định danh)

            ---

            ## 🎯 Quy tắc hỏi đáp
            - Chỉ hỏi về **phần còn thiếu trong facts**, để có thể render layout hoàn chỉnh.
            - Mỗi lượt chỉ đưa ra **1 câu hỏi ngắn, rõ ràng, dễ trả lời**.
            - Không lặp lại nội dung đã có.
            - Giữ giọng thân thiện, tự nhiên như BA đang hỏi designer.
            - Không dùng markdown, không dùng dấu *, -, hoặc số thứ tự.
            - Nếu người dùng đã mô tả rõ một phần, xác nhận nhanh rồi hỏi tiếp phần khác.

            ---

            ## 🧩 Quy trình gợi ý (có thể tuần tự hoặc linh hoạt theo context):

            **1️⃣ Thành phần & Nội dung (Components & Content)**
            Hỏi xem trang gồm những phần nào, text hoặc button gì, placeholder ra sao.
            Ví dụ: “Trang này có cần thêm nút Đăng ký hoặc Quên mật khẩu không?”
            Hoặc: “Bạn muốn hiển thị tiêu đề gì trên đầu trang?”

            **2️⃣ Bố cục & Flow**
            Hỏi về vị trí, căn chỉnh, thứ tự.
            Ví dụ: “Bạn muốn form nằm giữa hay lệch trái?”, “Nút đăng nhập nằm dưới ô mật khẩu đúng không?”

            **3️⃣ Màu sắc & Phong cách**
            Hỏi về màu nền, màu chủ đạo, font.
            Ví dụ: “Bạn muốn nền trắng hay tông thương hiệu?”, “Font chữ nên hiện đại hay cổ điển?”

            **4️⃣ Trải nghiệm & Hành vi**
            Hỏi về hiệu ứng, phản hồi người dùng.
            Ví dụ: “Sau khi nhấn Đăng nhập, có hiện loading hoặc thông báo lỗi không?”

            **5️⃣ Thương hiệu & Nhất quán**
            Hỏi về logo, guideline, accessibility.
            Ví dụ: “Trang này có cần logo thương hiệu ở trên cùng không?”

            ---

            ## ✅ Mục tiêu cuối cùng:
            Khi đã có đủ facts, bạn **ngừng đặt câu hỏi** và có thể xác nhận kiểu:
            “Vậy là tôi đã có đủ thông tin để sinh layout Figma JSON hoàn chỉnh.”
        `
    ;

        return await GeminiRepository.sendChatMessage(MODEL, conversationId, userMessage, systemPrompt);
    },

    async generateFigmaPrompt(goal, facts = []) {
        const systemPrompt = `
    Bạn là AI chuyên tạo layout Figma dưới dạng JSON, dùng để render trực tiếp trong plugin Figma.
    Hãy dựa vào mô tả và các "facts" bên dưới để sinh layout chuẩn, gồm các khối cơ bản: FRAME, RECTANGLE, TEXT.

    ### Quy tắc bắt buộc:
    1. Kết quả trả về **chỉ là JSON**, không bao gồm \`\`\`json\`\`\` hoặc mô tả bằng chữ.
    2. Node gốc phải có:
    - "type": "FRAME"
    - "name": tên layout (ví dụ "Login Page")
    - Có thể chứa các node con.
    3. Mỗi node có thể có các thuộc tính sau:
    - "type": "FRAME" | "RECTANGLE" | "TEXT"
    - "name": string
    - "x", "y": number
    - "width", "height": number
    - "cornerRadius": number (tùy chọn)
    - "fills": [{ "type": "SOLID", "color": { "r": number, "g": number, "b": number, "a": number } }]
    - "style": { "fontFamily": string, "fontSize": number, "fontWeight": number }
    - "characters": string (nội dung text)
    - "children": [] (chỉ FRAME mới có)
    4. Không thêm trường id, visible, constraints, strokes, strokeWeight, effects,...
    5. Không đặt children trong RECTANGLE hoặc TEXT.
    6. Sử dụng tọa độ (x, y) và kích thước (width, height) thực tế, nằm trong khoảng 0–1000.
    7. Màu sắc và font phải dùng giá trị RGB chuẩn hóa (0–1).
    8. Nếu facts có ngôn ngữ tiếng Việt, vẫn giữ nguyên text tiếng Việt cho characters.

    ### Ví dụ cấu trúc JSON đúng
    {
    "type": "FRAME",
    "name": "Login Page",
    "x": 100,
    "y": 100,
    "width": 400,
    "height": 550,
    "cornerRadius": 8,
    "fills": [{ "type": "SOLID", "color": { "r": 1, "g": 1, "b": 1, "a": 1 } }],
    "children": [
        {
        "type": "TEXT",
        "name": "Logo",
        "x": 140,
        "y": 24,
        "characters": "MyApp",
        "style": { "fontFamily": "Inter", "fontSize": 32, "fontWeight": 700 },
        "fills": [{ "type": "SOLID", "color": { "r": 0.2, "g": 0.7, "b": 0.3, "a": 1 } }]
        },
        {
        "type": "FRAME",
        "name": "Email Input",
        "x": 40,
        "y": 120,
        "width": 320,
        "height": 48,
        "cornerRadius": 4,
        "fills": [{ "type": "SOLID", "color": { "r": 0.95, "g": 0.95, "b": 0.95, "a": 1 } }],
        "children": [
            {
            "type": "TEXT",
            "name": "Placeholder",
            "x": 12,
            "y": 12,
            "characters": "Nhập email...",
            "style": { "fontFamily": "Inter", "fontSize": 16 },
            "fills": [{ "type": "SOLID", "color": { "r": 0.6, "g": 0.6, "b": 0.6, "a": 1 } }]
            }
        ]
        }
    ]
    }
    `;

        const text = `
🎯 Mục tiêu dự án: ${goal || "Không có"}.
📋 Các yêu cầu người dùng đã xác nhận (facts):
${facts.length ? facts.map((f, i) => `${i + 1}. ${f}`).join("\n") : "Chưa có facts."}
    `;

        return await GeminiRepository.generateContent(MODEL, text, systemPrompt);
    }

}

export default GeminiService;