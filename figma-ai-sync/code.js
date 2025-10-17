figma.showUI(__html__, { width: 300, height: 80 });

figma.ui.onmessage = async function (payload) {
    try {
        var layout = payload.layout || payload.data;
        if (!layout) {
            console.error("⚠️ Không nhận được layout hợp lệ:", payload);
            return;
        }

        console.log("📩 Nhận layout:", layout.name);

        var root = figma.createFrame();
        root.name = layout.name || "AI Layout";
        root.layoutMode = "NONE";
        if (layout.width && layout.height) root.resize(layout.width, layout.height);
        if (layout.fills && "fills" in root) root.fills = clonePaints(layout.fills);

        // render children
        await renderNode(layout, root);

        figma.currentPage.appendChild(root);
        figma.viewport.scrollAndZoomIntoView([root]);
        console.log("🎨 Layout render xong!");
    } catch (err) {
        console.error("❌ Lỗi render:", err);
    }
};

// ===========================
// 🧩 HÀM HỖ TRỢ
// ===========================
function clonePaints(paints) {
    if (!Array.isArray(paints) || paints.length === 0) return [];
    return paints.map(function (p) {
        return {
            type: "SOLID",
            color: {
                r: p.color.r,
                g: p.color.g,
                b: p.color.b
            },
            opacity: (p.color.a !== undefined) ? p.color.a : (p.opacity !== undefined ? p.opacity : 1)
        };
    });
}

// ===========================
// 🧩 HÀM CHÍNH RENDER NODE
// ===========================
async function renderNode(node, parent) {
    if (!node || !node.children || !Array.isArray(node.children)) return;

    for (var i = 0; i < node.children.length; i++) {
        var child = node.children[i];
        if (!child || typeof child !== "object") continue;
        var el = null;

        try {
            console.log("🧩 Creating " + child.type + ' "' + child.name + '" inside ' + parent.name);

            // Kiểm tra parent hợp lệ
            if (["FRAME", "PAGE", "GROUP"].indexOf(parent.type) === -1) {
                console.warn("⚠️ Parent " + parent.name + " (" + parent.type + ") không hợp lệ để chứa con.");
                continue;
            }

            switch (child.type) {
                case "FRAME":
                    el = figma.createFrame();
                    safeApplyFrameProps(el, child);
                    break;

                case "RECTANGLE":
                    el = figma.createRectangle();
                    safeApplyRectProps(el, child);
                    break;

                case "TEXT":
                    el = await createSafeText(child);
                    break;

                default:
                    console.warn("⚠️ Loại node chưa hỗ trợ:", child.type);
                    continue;
            }

            el.name = child.name || child.type;
            if (typeof child.x === "number") el.x = child.x;
            if (typeof child.y === "number") el.y = child.y;

            parent.appendChild(el);

            if (child.children && child.children.length > 0) {
                await renderNode(child, el);
            }

        } catch (e) {
            console.error("❌ Lỗi khi render node \"" + child.name + "\" (" + child.type + "):", e);
        }
    }
}

// ===========================
// 🧩 SUB-FUNCTIONS CHUYÊN BIỆT
// ===========================
function safeApplyFrameProps(el, data) {
    if (data.width && data.height) el.resize(data.width, data.height);
    if (data.cornerRadius != null) el.cornerRadius = data.cornerRadius;
    if (data.fills) el.fills = clonePaints(data.fills);
}

function safeApplyRectProps(el, data) {
    if (data.width && data.height) el.resize(data.width, data.height);
    if (data.cornerRadius != null) el.cornerRadius = data.cornerRadius;
    if (data.fills) el.fills = clonePaints(data.fills);
}

async function createSafeText(child) {
    var el = figma.createText();
    var ff = (child.style && child.style.fontFamily) ? child.style.fontFamily : "Inter";
    var weight = (child.style && child.style.fontWeight) ? child.style.fontWeight : 400;
    var bold = weight >= 600;
    var styleName = bold ? "Bold" : "Regular";

    try {
        await figma.loadFontAsync({ family: ff, style: styleName });
    } catch (err) {
        await figma.loadFontAsync({ family: "Inter", style: "Regular" });
    }

    await new Promise(function (r) { setTimeout(r, 10); });

    el.fontName = { family: ff, style: styleName };
    el.characters = child.characters || "";
    if (child.style && child.style.fontSize) el.fontSize = child.style.fontSize;
    if (child.fills) el.fills = clonePaints(child.fills);

    return el;
}
