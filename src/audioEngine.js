/**
 * AudioEngine: Trình phát âm thanh độc lập
 * - Không phụ thuộc vào DOM.
 * - Hỗ trợ phát đa âm (Polyphony) thông qua cloneNode.
 */
class PolyphonicAudioEngine {
    constructor() {
        // Ánh xạ tên âm thanh (phải khớp với thuộc tính data-sound trong HTML) với đường dẫn file
        this.soundMap = {
            'kick': 'assets/sounds/Bass.wav',
            'snare': 'assets/sounds/Snare.wav',
            'hihat': 'assets/sounds/Overhead.wav',
            'tom': 'assets/sounds/Tom.wav',
            'clap': 'assets/sounds/Clap.wav'
        };
        
        this.audioCache = {};
        this.preloadSounds();
    }

    /**
     * Tải trước âm thanh vào bộ nhớ cache để giảm độ trễ khi phát
     */
    preloadSounds() {
        for (const [name, path] of Object.entries(this.soundMap)) {
            const audio = new Audio(path);
            audio.preload = 'auto';
            this.audioCache[name] = audio;
        }
    }

    /**
     * Phát âm thanh dựa trên tên định danh
     * @param {string} soundName - Tên âm thanh (ví dụ: 'kick', 'snare')
     */
    play(soundName) {
        const baseAudio = this.audioCache[soundName];
        
        if (!baseAudio) {
            console.warn(`[AudioEngine] Không tìm thấy âm thanh: ${soundName}`);
            return;
        }

        // TẠO ĐA ÂM (POLYPHONY): 
        // Clone (nhân bản) đối tượng Audio thay vì dùng lại đối tượng gốc.
        // Điều này cho phép một âm thanh được phát chồng lên nhau nhiều lần
        // mà không bị ngắt tiếng cũ khi người dùng gõ liên tục.
        const soundInstance = baseAudio.cloneNode();
        soundInstance.currentTime = 0;
        
        // Bắt lỗi play() bị chặn bởi chính sách Autoplay của trình duyệt
        soundInstance.play().catch(error => {
            console.error(`[AudioEngine] Lỗi phát âm thanh ${soundName}:`, error);
        });
    }
}

// Xuất ra một instance duy nhất (Singleton pattern) để sử dụng xuyên suốt ứng dụng
export const audioEngine = new PolyphonicAudioEngine();