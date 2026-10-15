import { audioEngine } from './audioEngine.js';
import { recorder } from './recorder.js';

class DrumKitController {
    constructor() {
        this.pads = document.querySelectorAll('.pad[data-key]');
        this.btnRecord = document.getElementById('btn-record');
        this.btnStop = document.getElementById('btn-stop');
        this.btnPlay = document.getElementById('btn-play');
        this.init();
    }

    init() {
        // Lắng nghe phím bấm trên toàn window
        window.addEventListener('keydown', this.handleKeyDown.bind(this));
        
        // Lắng nghe sự kiện kết thúc transition để xóa hiệu ứng UI
        this.pads.forEach(pad => {
            pad.addEventListener('transitionend', this.removeTransition.bind(this));
        });

        // Liên kết sự kiện nút Record
        this.btnRecord.addEventListener('click', () => {
            recorder.startRecording();
            this.btnRecord.disabled = true;
            this.btnStop.disabled = false;
            this.btnPlay.disabled = true;
        });

        // Liên kết sự kiện nút Stop
        this.btnStop.addEventListener('click', () => {
            recorder.stopRecording();
            this.btnRecord.disabled = false;
            this.btnStop.disabled = true;
            this.btnPlay.disabled = false;
        });

        // Liên kết sự kiện nút Playback
        this.btnPlay.addEventListener('click', () => {
            recorder.playRecording();
        });
    }

    handleKeyDown(event) {
        // BẮT BUỘC (MANDATORY): Event Repeat Throttling
        // Chặn sự kiện kích hoạt hàng loạt nếu người dùng đè giữ phím xuống
        if (event.repeat) return;

        // Lấy mã phím vật lý (ví dụ: 'KeyA', 'KeyS' tương đương với phím A, S)
        const keyCode = event.code; 

        // Tra cứu hợp đồng DOM: Tìm phần tử có data-key tương ứng
        const pad = document.querySelector(`.pad[data-key="${keyCode}"]`);
        
        if (!pad) return; // Bỏ qua nếu phím gõ không nằm trong hệ thống hợp đồng

        // Đọc data-sound và kích hoạt Polyphonic Audio Engine
        const soundName = pad.dataset.sound;
        audioEngine.play(soundName);

        // Thêm hiệu ứng thị giác
        pad.classList.add('playing');
        
        // Ghi lại nhịp điệu vào hàng đợi FIFO (nếu đang bật Record)
        recorder.recordBeat(soundName);
    }

    removeTransition(event) {
        // Chỉ bắt sự kiện kết thúc của transform để tối ưu hiệu năng
        if (event.propertyName !== 'transform') return;
        event.target.classList.remove('playing');
    }
}

// Khởi chạy hệ thống khi DOM tải xong
document.addEventListener('DOMContentLoaded', () => {
    new DrumKitController();
});