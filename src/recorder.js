import { audioEngine } from './audioEngine.js';

class FIFORecorder {
    constructor() {
        this.beatQueue = []; // Cấu trúc FIFO lưu trữ chuỗi nhịp gõ
        this.isRecording = false;
        this.startTime = 0;
        this.playbackTimeouts = []; // Quản lý các luồng phát lại để có thể dừng đột ngột
    }

    startRecording() {
        this.beatQueue = []; // Xóa hàng đợi cũ
        this.isRecording = true;
        this.startTime = performance.now(); // Ghi nhận mốc T0
    }

    stopRecording() {
        this.isRecording = false;
    }

    recordBeat(soundName) {
        if (!this.isRecording) return;
        
        // Tính toán khoảng thời gian (ms) kể từ lúc bấm Record (T0)
        const timestamp = performance.now() - this.startTime;
        
        // Đẩy sự kiện vào cuối hàng đợi (First-In)
        this.beatQueue.push({ soundName, timestamp }); 
    }

    playRecording() {
        if (this.isRecording || this.beatQueue.length === 0) return;

        this.clearPlayback(); // Dọn dẹp luồng phát cũ nếu người dùng spam nút Play

        // Duyệt hàng đợi và phát âm thanh (First-Out)
        this.beatQueue.forEach(beat => {
            const timeoutId = setTimeout(() => {
                audioEngine.play(beat.soundName);
            }, beat.timestamp);
            
            this.playbackTimeouts.push(timeoutId);
        });
    }

    clearPlayback() {
        this.playbackTimeouts.forEach(id => clearTimeout(id));
        this.playbackTimeouts = [];
    }
}

export const recorder = new FIFORecorder();