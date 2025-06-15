// @ts-nocheck
// 型別檢查忽略，因 chrome API 與 window 擴充
document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('expandBtn');
    if (btn) {
        btn.style.display = 'block';
        btn.style.width = '100%';
        btn.style.margin = '16px 0 0 0';
        btn.style.fontSize = '16px';
        btn.style.letterSpacing = '2px';
        btn.style.boxShadow = '0 2px 8px rgba(25, 118, 210, 0.15)';
        btn.style.transition = 'background 0.2s';
        btn.onmouseover = () => btn.style.background = '#1565c0';
        btn.onmouseout = () => btn.style.background = '#1976d2';
    }

    // 顯示版本號
    fetch(chrome.runtime.getURL('src/version.json'))
        .then(res => res.json())
        .then(data => {
            document.querySelector('.version').textContent = `版本：${data.version}`;
        });

    // 點擊展開所有節點，呼叫 content script 的 window.expandAllNodes
    btn?.addEventListener('click', () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                func: () => {
                    // 這裡無法直接呼叫 content script 的 import 函式，只能呼叫 window 上的全域函式
                    if (window.expandAllNodes) {
                        window.expandAllNodes();
                        console.log('已從 popup 觸發展開所有節點');
                    } else {
                        console.log('找不到展開函式，請確認 content script 是否正確注入');
                    }
                }
            });
        });
    });
});
