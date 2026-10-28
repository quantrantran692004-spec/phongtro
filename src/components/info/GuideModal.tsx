import React from 'react';
import { X, BookOpen, ShieldCheck, AlertCircle, FileText, CheckCircle2, Phone } from 'lucide-react';

interface GuideModalProps {
  onClose: () => void;
}

export const GuideModal: React.FC<GuideModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] flex flex-col shadow-card-hover border border-[#E5E2D9] overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="p-5 border-b border-[#E5E2D9] flex items-center justify-between bg-[#FAF9F7]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-md bg-[#23483D] text-white flex items-center justify-center shadow-whisper">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-semibold text-[#252725] text-lg">Cẩm Nang Thuê Phòng Trọ Thái Nguyên</h2>
              <p className="text-xs text-[#777B78] mt-0.5">Kinh nghiệm thực tế từ sinh viên & pháp lý minh bạch</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 text-[#777B78] hover:text-[#252725] rounded hover:bg-[#EFEEE8] transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-6 text-sm text-[#252725] leading-relaxed">
          {/* Section 1 */}
          <div className="bg-[#FAF9F7] border border-[#E5E2D9] p-4 rounded-md">
            <h3 className="font-semibold text-rose-800 flex items-center gap-2 mb-2 text-base">
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
              <span>1. Cảnh giác bẫy lừa cọc qua mạng xã hội</span>
            </h3>
            <p className="text-xs sm:text-sm text-[#555955] space-y-1">
              • Tuyệt đối <strong>KHÔNG chuyển khoản bất kỳ khoản tiền nào</strong> (tiền giữ chỗ, cọc phòng) trước khi đến tận nơi xem phòng, gặp chính chủ và kiểm tra chìa khóa.<br />
              • Các tin lừa đảo thường có đặc điểm: Ảnh phòng studio đẹp như khách sạn 5 sao nhưng giá chỉ 700k - 900k, hối thúc chuyển cọc vì &quot;có người khác đang hỏi&quot;.
            </p>
          </div>

          {/* Section 2 */}
          <div className="space-y-2">
            <h3 className="font-semibold text-[#252725] text-base flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#23483D]" />
              <span>2. 5 Điều khoản bắt buộc trong Hợp đồng thuê phòng</span>
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-[#555955] pl-1">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#23483D] shrink-0 mt-0.5" />
                <span><strong>Tiền đặt cọc:</strong> Ghi rõ điều kiện hoàn trả cọc (ví dụ: báo trước 30 ngày khi chuyển đi).</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#23483D] shrink-0 mt-0.5" />
                <span><strong>Đơn giá điện nước:</strong> Ghi cụ thể số tiền/kWh và số tiền/khối, tránh mập mờ tính theo đầu người giá cao.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#23483D] shrink-0 mt-0.5" />
                <span><strong>Bàn giao tài sản:</strong> Lập biên bản kiểm kê thiết bị (điều hòa, bình nóng lạnh, bóng đèn) còn hoạt động tốt.</span>
              </li>
            </ul>
          </div>

          {/* Section 3 */}
          <div className="space-y-2">
            <h3 className="font-semibold text-[#252725] text-base flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#23483D]" />
              <span>3. Tiêu chí an toàn phòng cháy chữa cháy (PCCC)</span>
            </h3>
            <p className="text-xs sm:text-sm text-[#555955]">
              Kiểm tra kỹ: Nhà trọ có tối thiểu 2 lối thoát hiểm (cầu thang bộ + ban công thoát hiểm), có trang bị bình chữa cháy ở mỗi tầng và khu vực sạc xe máy điện có rơ-le ngắt an toàn.
            </p>
          </div>

          {/* Hotline */}
          <div className="bg-[#FAF9F7] border border-[#E5E2D9] p-4 rounded-md flex items-center justify-between">
            <div>
              <div className="font-semibold text-[#252725] text-sm">Cần hỗ trợ tư vấn phòng trọ Thái Nguyên?</div>
              <div className="text-xs text-[#777B78] mt-0.5">Đội ngũ sinh viên tình nguyện hỗ trợ tìm trọ miễn phí</div>
            </div>
            <a
              href="tel:0984512345"
              className="inline-flex items-center gap-1.5 bg-[#23483D] hover:bg-[#1A372E] text-white font-medium text-xs px-3.5 py-2 rounded-md shadow-whisper transition"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Hotline miễn phí</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
