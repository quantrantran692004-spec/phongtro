-- ==============================================================================
-- TRỌ THÁI NGUYÊN - SEED DATA SCRIPT
-- Các khu vực: P. Tân Thịnh, P. Quang Trung, P. Quyết Thắng, TX. Phổ Yên
-- ==============================================================================

-- 1. Insert Initial Users (Landlords, Tenants, Admins)
INSERT INTO users (id, email, phone, full_name, role, is_phone_verified, is_identity_verified, rating, review_count, response_time)
VALUES
    ('c1111111-1111-1111-1111-111111111111', 'colan.tanthinh@gmail.com', '0988123456', 'Cô Lan (Khu Làng SV Tân Thịnh)', 'landlord', TRUE, TRUE, 4.95, 38, 'Dưới 15 phút'),
    ('c2222222-2222-2222-2222-222222222222', 'chuhung.quangtrung@gmail.com', '0912987654', 'Chú Hùng (ĐH Y Dược Thái Nguyên)', 'landlord', TRUE, TRUE, 4.88, 24, 'Dưới 30 phút'),
    ('c3333333-3333-3333-3333-333333333333', 'bacson.z115@gmail.com', '0977456789', 'Bác Sơn (Trục đường Z115 Quyết Thắng)', 'landlord', TRUE, TRUE, 4.92, 19, 'Dưới 20 phút'),
    ('c4444444-4444-4444-4444-444444444444', 'anhhai.phoyen@gmail.com', '0966321654', 'Anh Hải (Khu KCN Samsung Phổ Yên)', 'landlord', TRUE, TRUE, 4.85, 41, 'Dưới 10 phút'),
    ('a1111111-1111-1111-1111-111111111111', 'admin@trothainguyen.vn', '02083999888', 'Ban Quản Trị Trọ Thái Nguyên', 'admin', TRUE, TRUE, 5.0, 100, 'Tức thì'),
    ('b1111111-1111-1111-1111-111111111111', 'an.nguyen@student.tump.edu.vn', '0398765432', 'Nguyễn Thu An (SV ĐH Y Dược)', 'tenant', TRUE, FALSE, 5.0, 0, 'Dưới 1 giờ')
ON CONFLICT (email) DO NOTHING;

-- 2. Insert Rooms
INSERT INTO rooms (
    id, landlord_id, title, slug, description, room_type, area, capacity, 
    status, approval_status, is_verified, is_featured, views_count, saved_count,
    address_line, ward, district, city, latitude, longitude
) VALUES
(
    'r1111111-1111-1111-1111-111111111111',
    'c1111111-1111-1111-1111-111111111111',
    'Phòng trọ gác xép cao cấp khép kín ngõ 42 Làng SV Tân Thịnh',
    'phong-tro-gac-xep-cao-cap-khep-kin-ngo-42-lang-sv-tan-thinh',
    'Dãy phòng trọ 3 tầng xây mới hoàn toàn, cách cổng trường CNTT 300m, cách Sư Phạm 600m. Có gác xép bê tông đúc kiên cố cao 2m đứng thoải mái. Đã trang bị sẵn điều hòa Inverter Casper 9000BTU tiết kiệm điện, bình nóng lạnh Rossi 20L, quạt trần, kệ bếp chậu rửa mặt đá granite sạch sẽ. Khóa vân tay từng phòng, camera 24/7.',
    'single',
    25.0,
    2,
    'available',
    'approved',
    TRUE,
    TRUE,
    892,
    64,
    'Số 42, Ngõ 168 Lương Thế Vinh, P. Tân Thịnh, TP. Thái Nguyên',
    'P. Tân Thịnh',
    'TP. Thái Nguyên',
    'Thái Nguyên',
    21.5855,
    105.8198
),
(
    'r2222222-2222-2222-2222-222222222222',
    'c2222222-2222-2222-2222-222222222222',
    'Studio full nội thất ban công thoáng mát đối diện cổng phụ ĐH Y Dược',
    'studio-full-noi-that-ban-cong-doi-dien-cong-phu-dh-y-duoc',
    'Phòng Studio chuẩn căn hộ mini tại ngõ 284 Lương Ngọc Quyến, chỉ 2 phút đi bộ sang giảng đường ĐH Y Dược Thái Nguyên và BV Trung Ương. Đầy đủ tủ lạnh mini Aqua, máy giặt riêng ngoài ban công, điều hòa, đệm cao su, bàn học đôi cho sinh viên y. Khu vực dân trí cao, yên tĩnh học bài đêm.',
    'studio',
    30.0,
    2,
    'available',
    'approved',
    TRUE,
    TRUE,
    1420,
    118,
    'Ngõ 284 Lương Ngọc Quyến, P. Quang Trung, TP. Thái Nguyên',
    'P. Quang Trung',
    'TP. Thái Nguyên',
    'Thái Nguyên',
    21.5932,
    105.8321
),
(
    'r3333333-3333-3333-3333-333333333333',
    'c3333333-3333-3333-3333-333333333333',
    'Chung cư mini 1N1K trục Z115 Quyết Thắng thang máy khóa thẻ từ',
    'chung-cu-mini-1n1k-truc-z115-quyet-thang-thang-may-khoa-the-tu',
    'Toà nhà CCMN 6 tầng có thang máy tốc độ cao, ngay mặt ngõ ô tô tránh nhau đường Z115. Phòng thiết kế 1 phòng khách liền bếp và 1 phòng ngủ riêng biệt, phù hợp 2-3 bạn ở ghép hoặc gia đình trẻ làm việc tại viện A / trường Khoa Học. Bếp từ đôi hút mùi, sofa nỉ cao cấp.',
    'mini_apartment',
    38.0,
    3,
    'available',
    'approved',
    TRUE,
    TRUE,
    650,
    42,
    'Mặt ngõ 89 đường Z115, P. Quyết Thắng, TP. Thái Nguyên',
    'P. Quyết Thắng',
    'TP. Thái Nguyên',
    'Thái Nguyên',
    21.5741,
    105.8089
),
(
    'r4444444-4444-4444-4444-444444444444',
    'c4444444-4444-4444-4444-444444444444',
    'Phòng trọ khép kín giá rẻ công nhân Samsung Yên Bình - Ba Hàng',
    'phong-tro-khep-kin-gia-re-cong-nhan-samsung-yen-binh-ba-hang',
    'Phòng trọ xây khép kín sạch sẽ dành cho công nhân KCN Yên Bình Samsung Thái Nguyên. Cách cổng nhà máy SEVT 800m, đi làm xe máy 3 phút hoặc đi bộ được. Trần tôn lạnh cách nhiệt mùa hè mát mẻ, có gác lửng để đồ, vòi sen và bệ xí bệt. Giờ giấc tự do 24/24 theo ca kíp làm việc.',
    'single',
    18.0,
    2,
    'available',
    'approved',
    TRUE,
    FALSE,
    480,
    26,
    'Tổ dân phố 3, P. Ba Hàng, TX. Phổ Yên, Thái Nguyên',
    'TX. Phổ Yên',
    'Thái Nguyên',
    'Thái Nguyên',
    21.4182,
    105.8645
)
ON CONFLICT (slug) DO NOTHING;

-- 3. Insert Room Costs
INSERT INTO room_costs (room_id, rent, deposit, electricity, electricity_type, water, water_type, internet, parking, service_fee)
VALUES
(
    'r1111111-1111-1111-1111-111111111111',
    1600000, 1000000, 3500, 'counter', 30000, 'person', 50000, 0, 30000
),
(
    'r2222222-2222-2222-2222-222222222222',
    2700000, 2000000, 3500, 'counter', 25000, 'counter', 0, 0, 50000
),
(
    'r3333333-3333-3333-3333-333333333333',
    3200000, 3000000, 3800, 'counter', 25000, 'counter', 80000, 0, 80000
),
(
    'r4444444-4444-4444-4444-444444444444',
    950000, 500000, 3000, 'counter', 25000, 'person', 40000, 0, 0
)
ON CONFLICT (room_id) DO NOTHING;

-- 4. Insert Room Images
INSERT INTO room_images (room_id, image_url, display_order, is_cover)
VALUES
(
    'r1111111-1111-1111-1111-111111111111',
    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80',
    0, TRUE
),
(
    'r1111111-1111-1111-1111-111111111111',
    'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
    1, FALSE
),
(
    'r2222222-2222-2222-2222-222222222222',
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80',
    0, TRUE
),
(
    'r3333333-3333-3333-3333-333333333333',
    'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1200&q=80',
    0, TRUE
),
(
    'r4444444-4444-4444-4444-444444444444',
    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80',
    0, TRUE
);
