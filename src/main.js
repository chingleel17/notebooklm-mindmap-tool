// 直接將 expandAllNodes 內容貼到這裡，避免 import/export 問題
// 遞迴展開所有 g.node > circle 節點
var isExpanding = false;
function expandAllNodes() {
    if (isExpanding) {
        console.log('展開進行中，略過重複呼叫');
        return;
    }
    isExpanding = true;
    var expandedSet = new Set();
    function expandLayer() {
        var expanded = false;
        var circles = Array.from(document.querySelectorAll('g.node > circle'));
        circles.forEach(function (circle) {
            if (!expandedSet.has(circle)) {
                circle.dispatchEvent(new MouseEvent('click', { bubbles: true }));
                expandedSet.add(circle);
                expanded = true;
            }
        });
        if (expanded) {
            setTimeout(expandLayer, 500);
            console.log('展開中，等待下一層節點...');
        }
        else {
            console.log('所有層級已展開');
            isExpanding = false;
            // 展開完成後自動置中主節點
            centerMindmap();
            console.log('心智圖已置中');
        }
    }
    expandLayer();
    console.log('開始展開所有節點...');
}
function centerMindmap() {
    // 嘗試置中第一個 g.node 或 svg
    var svg = document.querySelector('svg');
    var node = document.querySelector('g.node');
    if (svg && node) {
        var svgRect = svg.getBoundingClientRect();
        var nodeRect = node.getBoundingClientRect();
        var scrollX_1 = nodeRect.left + nodeRect.width / 2 - window.innerWidth / 2;
        var scrollY_1 = nodeRect.top + nodeRect.height / 2 - window.innerHeight / 2;
        window.scrollBy({ left: scrollX_1, top: scrollY_1, behavior: 'smooth' });
    }
}
// 將展開函式掛到 window 以供 popup 呼叫
window.expandAllNodes = expandAllNodes;
// 監聽 DOM 變化，偵測心智圖對話框出現
function observeMindmapDialog() {
    console.log('開始監聽 DOM 變化以偵測心智圖對話框');
    var observer = new MutationObserver(function () {
        var _a;
        console.log('偵測到 DOM 變化，檢查心智圖對話框是否出現');
        // 尋找心智圖下載按鈕所在的區塊
        var dialog = document.querySelector('div.mindmap-container, mindmap, .mindmap');
        if (!dialog)
            return;
        console.log('心智圖對話框已出現，準備插入展開按鈕');
        // 檢查是否已經插入過
        if (document.getElementById('notebooklm-expand-btn'))
            return;
        console.log('插入展開按鈕到下載按鈕旁邊');
        // 找到右上角按鈕區塊（通常包含下載按鈕）
        var downloadBtn = document.querySelector('button[aria-label="下載"]');
        if (!downloadBtn)
            return;
        console.log('找到下載按鈕，準備插入展開按鈕');
        // 建立展開按鈕
        var expandBtn = document.createElement('button');
        expandBtn.id = 'notebooklm-expand-btn';
        expandBtn.innerText = '展開所有節點';
        expandBtn.style.marginLeft = '12px';
        expandBtn.style.padding = '8px 16px';
        expandBtn.style.background = '#1976d2';
        expandBtn.style.color = '#fff';
        expandBtn.style.border = 'none';
        expandBtn.style.borderRadius = '20px';
        expandBtn.style.cursor = 'pointer';
        expandBtn.onclick = function () {
            expandAllNodes();
        };
        // 插入到下載按鈕旁邊
        (_a = downloadBtn.parentElement) === null || _a === void 0 ? void 0 : _a.appendChild(expandBtn);
    });
    observer.observe(document.body, { childList: true, subtree: true });
}
console.log('Content script 已經被注入！');
// 啟動監聽
observeMindmapDialog();
console.log('NotebookLM 心智圖展開插件已啟動，等待心智圖對話框出現...');
