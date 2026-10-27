import React from 'react';
import { X, BookOpen, ShieldCheck, AlertCircle, FileText, CheckCircle2, Phone } from 'lucide-react';

interface GuideModalProps {
  onClose: () => void;
}

export const GuideModal: React.FC<GuideModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-extrabold text-slate-900 text-lg">Cẩm nang thuê phòng trọ Thái Nguyên</h2>
              <p className="text-xs text-slate-500">Kinh nghiệm thực tế từ sinh viên & chuyên gia pháp lý</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-200">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-700 leading-relaxed">
          {/* Section 1 */}
          <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl">
            <h3 className="font-bold text-amber-900 flex items-center gap-2 mb-2 text-base">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
              <span>1. Cảnh giác bẫy lừa cọc qua mạng xã hội (Facebook / Zalo)</span>
            </h3>
            <p className="text-xs sm:text-sm text-amber-950/80 space-y-1">
              • Tuyệt đối <strong>KHÔNG chuyển khoản bất kỳ khoản tiền nào</strong> (tiền giữ chỗ, cọc phòng) trước khi đến tận nơi xem phòng, gặp chính chủ và kiểm tra chìa khóa.<br />
              • Các tin lừa đảo thường có đặc điểm: Ảnh phòng studio đẹp như khách sạn 5 sao nhưng giá chỉ 700k - 900k, hối thúc chuyển cọc vì "có người khác đang hỏi".
            </p>
          </div>

          {/* Section 2 */}
          <div className="space-y-2">
            <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <FileText className="w-5 h-5 text-emerald-600" />
              <span>2. 5 Điều khoản bắt buộc trong Hợp đồng thuê phòng</span>
            </h3>
            <ul className="space-y-1.5 text-xs sm:text-sm text-slate-600 pl-2">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Tiền đặt cọc:</strong> Ghi rõ điều kiện hoàn trả cọc (ví dụ: báo trước 30 ngày khi chuyển đi).</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Đơn giá điện nước:</strong> Ghi cụ thể số tiền/kWh và số tiền/khối, tránh mập mờ "tính theo đầu người" giá cao.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Bàn giao tài sản:</strong> Lập biên bản kiểm kê thiết bị (điều hòa, bình nóng lạnh, bóng đèn) còn hoạt động tốt.</span>
              </li>
            </ul>
          </div>

          {/* Section 3 */}
          <div className="space-y-2">
            <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-blue-600" />
              <span>3. Tiêu chí an toàn phòng cháy chữa cháy (PCCC)</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Kiểm tra kỹ: Nhà trọ có tối thiểu 2 lối thoát hiểm (cầu thang bộ + ban công thoát hiểm), có trang bị bình bột chữa cháy ở mỗi tầng và khu vực sạc xe máy điện có rơ-le ngắt an toàn.
            </p>
          </div>

          {/* Hotline */}
          <div className="bg-slate-100 p-4 rounded-2xl flex items-center justify-between">
            <div>
              <div className="font-bold text-slate-900 text-xs">Cần hỗ trợ tư vấn phòng trọ Thái Nguyên?</div>
              <div className="text-xs text-slate-500">Đội ngũ sinh viên tình nguyện hỗ trợ tìm trọ miễn phí</div>
            </div>
            <a
              href="tel:0984512345"
              className="inline-flex items-center gap-1.5 bg-emerald-600 text-white font-bold text-xs px-3.5 py-2 rounded-xl"
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
