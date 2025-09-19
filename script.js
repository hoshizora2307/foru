document.addEventListener('DOMContentLoaded', () => {
    // --- ベトナムの思い出データ ---
    const memories = [
        { image_url: "https://images.unsplash.com/photo-1593933596569-216a4a159cf1?q=80&w=1974&auto=format&fit=crop", vietnamese: "Một ngày mới bắt đầu.", japanese: "新しい一日が始まる。", description: "ハノイの朝焼けとホアンキエム湖", theme: "morning" },
        { image_url: "https://images.unsplash.com/photo-1574672199434-5231c64609a6?q=80&w=2070&auto=format&fit=crop", vietnamese: "Uống cà phê sáng.", japanese: "朝のコーヒーを飲む。", description: "ベトナムの路上カフェ（Cà phê sữa đá）", theme: "morning" },
        { image_url: "https://images.unsplash.com/photo-1595260195438-4c8a571a4738?q=80&w=1964&auto=format&fit=crop", vietnamese: "Ăn phở cho bữa trưa.", japanese: "お昼にフォーを食べる。", description: "ベトナムの国民食、温かいフォー", theme: "afternoon" },
        { image_url: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1974&auto=format&fit=crop", vietnamese: "Hương vị của quê hương.", japanese: "故郷の味。", description: "食欲をそそるベトナム料理", theme: "food" },
        { image_url: "https://images.unsplash.com/photo-1528114637243-5c9a5a7852c2?q=80&w=2070&auto=format&fit=crop", vietnamese: "Cánh đồng lúa xanh.", japanese: "緑の田んぼ。", description: "サパや北部の美しい棚田", theme: "afternoon" },
        { image_url: "https://images.unsplash.com/photo-1530843337424-4f810c33a2a6?q=80&w=1974&auto=format&fit=crop", vietnamese: "Phố cổ Hội An về đêm.", japanese: "夜のホイアン旧市街。", description: "ランタンの灯りが美しい夜", theme: "evening" },
        { image_url: "https://images.unsplash.com/photo-1563230232-73595561a3a3?q=80&w=2070&auto=format&fit=crop", vietnamese: "Quê hương là chùm khế ngọt.", japanese: "故郷は甘いゴレンシの房。", description: "ベトナムの有名な詩の一節。故郷への愛情を表します。", theme: "evening" },
        { image_url: "https://images.unsplash.com/photo-1508913837862-735c05c3b018?q=80&w=2070&auto=format&fit=crop", vietnamese: "Đi một ngày đàng, học một sàng khôn.", japanese: "一日の旅、一籠の知恵。", description: "「旅をすれば見聞が広まる」というベトナムのことわざ。", theme: "scenery" },
        { image_url: "https://images.unsplash.com/photo-1509762118739-16c2759e6f3b?q=80&w=2080&auto=format&fit=crop", vietnamese: "Vẻ đẹp của Vịnh Hạ Long.", japanese: "ハロン湾の美しさ。", description: "世界遺産にも登録されている幻想的な風景", theme: "scenery" },
    ];

    // --- DOM要素の取得 ---
    const mainImage = document.getElementById('main-image');
    const vietnameseText = document.getElementById('vietnamese-text');
    const japaneseText = document.getElementById('japanese-text');
    const descriptionText = document.getElementById('description-text');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const audio = document.getElementById('bgm');
    const playPauseBtn = document.getElementById('play-pause-btn');

    let currentIndex = 0;
    let isMusicStarted = false; // 音楽が一度でも再生されたかを記録

    // --- 機能の定義 ---
    function showMemory(index) {
        const memory = memories[index];
        mainImage.style.opacity = 0;
        setTimeout(() => {
            mainImage.src = memory.image_url;
            vietnameseText.textContent = memory.vietnamese;
            japaneseText.textContent = memory.japanese;
            descriptionText.textContent = memory.description;
            mainImage.style.opacity = 1;
        }, 500);
    }

    function getInitialIndex() {
        const hour = new Date().getHours();
        let theme;
        if (hour >= 5 && hour < 12) theme = 'morning';
        else if (hour >= 12 && hour < 18) theme = 'afternoon';
        else theme = 'evening';
        
        const themedIndex = memories.findIndex(m => m.theme === theme);
        return themedIndex !== -1 ? themedIndex : 0;
    }

    // ▼▼▼ 音楽再生の処理を修正 ▼▼▼
    function startMusicInteraction() {
        if (isMusicStarted) return; // 既に再生が開始されていれば何もしない

        // ユーザーの最初の操作で音楽を再生試行
        audio.play().then(() => {
            isMusicStarted = true;
            playPauseBtn.innerHTML = '<i class="material-icons">pause</i>';
            // 最初の操作イベントのリスナーを解除
            document.body.removeEventListener('click', startMusicInteraction);
            document.body.removeEventListener('touchstart', startMusicInteraction);
        }).catch(error => {
            // 自動再生がブロックされた場合でも、ボタンは押せる状態にする
            console.log("Autoplay was prevented. User needs to click the play button.");
            isMusicStarted = true; // 試行はしたのでフラグを立てる
            playPauseBtn.innerHTML = '<i class="material-icons">play_arrow</i>';
            document.body.removeEventListener('click', startMusicInteraction);
            document.body.removeEventListener('touchstart', startMusicInteraction);
        });
    }

    // --- イベントリスナーの設定 ---
    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + memories.length) % memories.length;
        showMemory(currentIndex);
    });

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % memories.length;
        showMemory(currentIndex);
    });

    playPauseBtn.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
            playPauseBtn.innerHTML = '<i class="material-icons">pause</i>';
        } else {
            audio.pause();
            playPauseBtn.innerHTML = '<i class="material-icons">play_arrow</i>';
        }
    });
    
    // ▼▼▼ ユーザーの最初の操作を待つリスナーを追加 ▼▼▼
    document.body.addEventListener('click', startMusicInteraction);
    document.body.addEventListener('touchstart', startMusicInteraction);


    // --- アプリの初期化 ---
    currentIndex = getInitialIndex();
    showMemory(currentIndex);
});
