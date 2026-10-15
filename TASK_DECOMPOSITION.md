# TASK DECOMPOSITION: Homework 2 - Drum Kit Engine (Contract-First)

## 📌 Nguyên tắc kiến trúc (Architectural Guidelines)
- **Decoupled Architecture**: HTML chịu trách nhiệm định nghĩa Dữ liệu/Hợp đồng (`data-key`, `data-sound`). JavaScript không được hardcode keycode hay đường dẫn âm thanh.
- **Contract-First**: Toàn bộ UI Markup & Data-attributes phải được chốt và commit trước khi viết dòng code JS đầu tiên.
- **Atomic Commits**: Mỗi Milestone tương ứng với 1 commit độc lập, truyền tải rõ ý nghĩa công việc.

---

## 🎯 Danh sách Milestones & Tiêu chí nghiệm thu (Acceptance Criteria)

### 🔹 Milestone 1: HTML Data Contract & Semantic Markup
- [ ] **Mục tiêu**: Định nghĩa toàn bộ giao diện Drum Kit và hợp đồng dữ liệu qua HTML attributes.
- [ ] **Tiêu chí nghiệm thu**:
  - Mỗi nút gõ (Drum Pad) chứa `data-key` (ví dụ: `KeyA`, `KeyS`) và `data-sound` (ví dụ: `kick`, `snare`).
  - Đảm bảo tính A11y (ARIA labels, keyboard focusable).
  - Hoàn toàn chưa có logic JavaScript động.
- [ ] **Commit Message**: `feat(contract): define HTML data-sound and data-key schema`

### 🔹 Milestone 2: Independent Polyphonic Audio Playback Engine
- [ ] **Mục tiêu**: Xây dựng lớp/module phát âm thanh đa âm độc lập với DOM và Event.
- [ ] **Tiêu chí nghiệm thu**:
  - Hỗ trợ phát nhiều âm thanh trùng nhau hoặc cùng 1 âm thanh dồn dập mà không bị ngắt tiếng (Polyphony).
  - Quản lý danh sách audio buffers/nodes hiệu quả, giải phóng bộ nhớ khi phát xong.
- [ ] **Commit Message**: `feat(audio): implement independent polyphonic audio engine`

### 🔹 Milestone 3: Keydown Listener & Event Repeat Throttling
- [ ] **Mục tiêu**: Bắt sự kiện bàn phím và xử lý chống lặp phím khi nhấn giữ.
- [ ] **Tiêu chí nghiệm thu**:
  - Lắng nghe `keydown` trên `window` hoặc target container.
  - Tra cứu Drum Pad dựa theo `data-key` trong DOM hợp đồng.
  - Loại bỏ các sự kiện lặp do giữ phím (`event.repeat === true` hoặc đệm throttle time).
  - Thêm visual feedback (active class) khi phím được kích hoạt.
- [ ] **Commit Message**: `feat(events): add keydown listener with event.repeat throttling`

### 🔹 Milestone 4: FIFO Beat Recorder & Playback Engine
- [ ] **Mục tiêu**: Bắt và ghi lại chuỗi sự kiện gõ phím kèm mốc thời gian để phát lại.
- [ ] **Tiêu chí nghiệm thu**:
  - Lưu trữ sự kiện vào Hàng đợi FIFO (`{ sound, timestamp }`).
  - Hỗ trợ Playback tái tạo chính xác khoảng thời gian gõ dựa trên timestamp (dùng `performance.now()`).
- [ ] **Commit Message**: `feat(recorder): implement timestamped FIFO beat recorder and playback`

---

## 🛡️ Live Defense Readiness Checklist (Kiểm tra trong 3 phút)
- [ ] Key-binding nằm 100% ở HTML `data-key`. Khi giảng viên đổi phím (ví dụ: `KeyA` -> `KeyZ`), chỉ cần sửa thuộc tính `data-key="KeyZ"` trong HTML mà không cần sửa 1 dòng JS nào.