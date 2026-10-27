-- ==============================================================================
-- TRỌ THÁI NGUYÊN - DATABASE SCHEMA (POSTGRESQL / SUPABASE)
-- Nền tảng tìm kiếm và quản lý phòng trọ minh bạch tỉnh Thái Nguyên
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==============================================================================
-- 1. ENUMS & CUSTOM TYPES
-- ==============================================================================
DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('tenant', 'landlord', 'admin');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE room_type AS ENUM ('single', 'studio', 'mini_apartment', 'whole_house', 'dormitory');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE room_status AS ENUM ('available', 'rented', 'pending');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE approval_status AS ENUM ('approved', 'pending', 'rejected');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE appointment_status AS ENUM ('pending', 'confirmed', 'completed', 'cancelled');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE report_status AS ENUM ('pending', 'investigating', 'resolved', 'dismissed');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- ==============================================================================
-- 2. USERS TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20) UNIQUE NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    avatar_url TEXT,
    role user_role DEFAULT 'tenant' NOT NULL,
    is_phone_verified BOOLEAN DEFAULT FALSE,
    is_identity_verified BOOLEAN DEFAULT FALSE,
    rating NUMERIC(3, 2) DEFAULT 5.0,
    review_count INTEGER DEFAULT 0,
    response_time VARCHAR(50) DEFAULT 'Trong 30 phút',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==============================================================================
-- 3. ROOMS TABLE (Phòng trọ)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS rooms (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    landlord_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(300) UNIQUE NOT NULL,
    description TEXT NOT NULL,
    room_type room_type DEFAULT 'single' NOT NULL,
    area NUMERIC(5, 2) NOT NULL,                 -- m2
    capacity INTEGER DEFAULT 2 NOT NULL,          -- Số người tối đa
    status room_status DEFAULT 'available' NOT NULL,
    approval_status approval_status DEFAULT 'pending' NOT NULL,
    rejection_reason TEXT,
    is_verified BOOLEAN DEFAULT FALSE,
    is_featured BOOLEAN DEFAULT FALSE,
    views_count INTEGER DEFAULT 0,
    saved_count INTEGER DEFAULT 0,
    
    -- Location fields
    address_line TEXT NOT NULL,
    ward VARCHAR(100) NOT NULL,                  -- Phường Tân Thịnh, Quang Trung, v.v.
    district VARCHAR(100) DEFAULT 'TP. Thái Nguyên' NOT NULL,
    city VARCHAR(100) DEFAULT 'Thái Nguyên' NOT NULL,
    latitude DOUBLE PRECISION NOT NULL,
    longitude DOUBLE PRECISION NOT NULL,
    
    -- Timestamp
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==============================================================================
-- 4. ROOM_COSTS TABLE (Minh bạch chi phí)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS room_costs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    room_id UUID UNIQUE NOT NULL REFERENCES rooms(id) ON DELETE CASCADE,
    rent NUMERIC(12, 0) NOT NULL,                 -- VNĐ/tháng
    deposit NUMERIC(12, 0) DEFAULT 0 NOT NULL,    -- VNĐ
    electricity NUMERIC(10, 0) NOT NULL,          -- VNĐ / số hoặc tháng
    electricity_type VARCHAR(20) DEFAULT 'counter' NOT NULL, -- 'counter' | 'fixed'
    water NUMERIC(10, 0) NOT NULL,                -- VNĐ / khối hoặc người
    water_type VARCHAR(20) DEFAULT 'counter' NOT NULL,       -- 'counter' | 'person' | 'fixed'
    internet NUMERIC(10, 0) DEFAULT 0 NOT NULL,   -- VNĐ / phòng
    parking NUMERIC(10, 0) DEFAULT 0 NOT NULL,    -- VNĐ / xe
    service_fee NUMERIC(10, 0) DEFAULT 0,         -- VNĐ
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==============================================================================
-- 5. ROOM_AMENITIES TABLE (Tiện ích phòng)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS room_amenities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    room_id UUID UNIQUE NOT NULL REFERENCES rooms(id) ON DELETE CASCADE,
    amenity_ids TEXT[] NOT NULL DEFAULT '{}'      -- ['air_conditioner', 'water_heater', 'private_bathroom', ...]
);

-- ==============================================================================
-- 6. ROOM_IMAGES TABLE (Hình ảnh phòng)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS room_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    room_id UUID NOT NULL REFERENCES rooms(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    display_order INTEGER DEFAULT 0,
    is_cover BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==============================================================================
-- 7. ROOM_RULES TABLE (Nội quy phòng)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS room_rules (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    room_id UUID NOT NULL REFERENCES rooms(id) ON DELETE CASCADE,
    rule_text VARCHAR(255) NOT NULL
);

-- ==============================================================================
-- 8. NEARBY_UNIVERSITIES TABLE (Khoảng cách trường học)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS room_nearby_landmarks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    room_id UUID NOT NULL REFERENCES rooms(id) ON DELETE CASCADE,
    landmark_name VARCHAR(150) NOT NULL,
    distance_km NUMERIC(4, 2) NOT NULL
);

-- ==============================================================================
-- 9. VIEWING_APPOINTMENTS TABLE (Lịch hẹn xem phòng)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS viewing_appointments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    room_id UUID NOT NULL REFERENCES rooms(id) ON DELETE CASCADE,
    tenant_id UUID REFERENCES users(id) ON DELETE SET NULL,
    tenant_name VARCHAR(100) NOT NULL,
    tenant_phone VARCHAR(20) NOT NULL,
    tenant_email VARCHAR(255),
    appointment_date DATE NOT NULL,
    appointment_time VARCHAR(20) NOT NULL,
    note TEXT,
    status appointment_status DEFAULT 'pending' NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==============================================================================
-- 10. VIOLATION_REPORTS TABLE (Báo cáo vi phạm / Tin giả)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS violation_reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    room_id UUID NOT NULL REFERENCES rooms(id) ON DELETE CASCADE,
    reporter_id UUID REFERENCES users(id) ON DELETE SET NULL,
    reporter_name VARCHAR(100) NOT NULL,
    reporter_phone VARCHAR(20) NOT NULL,
    reason VARCHAR(100) NOT NULL,                 -- 'fake_price', 'broker', 'rented_already', 'wrong_photo', 'scam'
    description TEXT NOT NULL,
    evidence_urls TEXT[],
    status report_status DEFAULT 'pending' NOT NULL,
    resolution_note TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==============================================================================
-- 11. SAVED_ROOMS TABLE (Yêu thích)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS saved_rooms (
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    room_id UUID NOT NULL REFERENCES rooms(id) ON DELETE CASCADE,
    saved_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    PRIMARY KEY (user_id, room_id)
);

-- ==============================================================================
-- 12. PERFORMANCE INDEXES
-- ==============================================================================
CREATE INDEX IF NOT EXISTS idx_rooms_ward ON rooms(ward);
CREATE INDEX IF NOT EXISTS idx_rooms_district ON rooms(district);
CREATE INDEX IF NOT EXISTS idx_rooms_type ON rooms(room_type);
CREATE INDEX IF NOT EXISTS idx_rooms_status ON rooms(status);
CREATE INDEX IF NOT EXISTS idx_rooms_approval ON rooms(approval_status);
CREATE INDEX IF NOT EXISTS idx_rooms_landlord ON rooms(landlord_id);
CREATE INDEX IF NOT EXISTS idx_room_costs_rent ON room_costs(rent);
CREATE INDEX IF NOT EXISTS idx_appointments_room ON viewing_appointments(room_id);
CREATE INDEX IF NOT EXISTS idx_appointments_tenant ON viewing_appointments(tenant_id);

-- ==============================================================================
-- 13. AUTO-UPDATE TRIGGER FUNCTION
-- ==============================================================================
CREATE OR REPLACE FUNCTION update_timestamp_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_update_users_timestamp ON users;
CREATE TRIGGER trigger_update_users_timestamp
BEFORE UPDATE ON users
FOR EACH ROW EXECUTE FUNCTION update_timestamp_column();

DROP TRIGGER IF EXISTS trigger_update_rooms_timestamp ON rooms;
CREATE TRIGGER trigger_update_rooms_timestamp
BEFORE UPDATE ON rooms
FOR EACH ROW EXECUTE FUNCTION update_timestamp_column();

-- ==============================================================================
-- 14. ROW LEVEL SECURITY (RLS) FOR SUPABASE
-- ==============================================================================
ALTER TABLE rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE room_costs ENABLE ROW LEVEL SECURITY;
ALTER TABLE viewing_appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE violation_reports ENABLE ROW LEVEL SECURITY;

-- Public can view approved and available rooms
CREATE POLICY "Public read approved rooms" ON rooms
    FOR SELECT USING (approval_status = 'approved');

CREATE POLICY "Public read approved room costs" ON room_costs
    FOR SELECT USING (true);

-- Landlords can CRUD their own rooms
CREATE POLICY "Landlord access own rooms" ON rooms
    FOR ALL USING (auth.uid() = landlord_id);
