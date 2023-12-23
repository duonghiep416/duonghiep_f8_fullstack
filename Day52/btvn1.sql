-- INSERT INTO teacher(name, bio) VALUES('Hoàng An', 'Fullstack F8'), ('Sơn Đặng', 'Fullstack F88'), ('Hoàng An 2', 'Fullstack F888');
INSERT INTO courses(name, price, description, content, teacher_id, active)
VALUES('Fullstack K1', 1400.5, 'Khóa học fullstack k1', 'Content khóa học fullstack k1', 4, true),
('Fullstack K2', 1400.6, 'Khóa học fullstack k2', 'Content khóa học fullstack k2', 4, true),
('Fullstack K3', 1400.7, 'Khóa học fullstack k3', 'Content khóa học fullstack k3', 4, true),
('Fullstack K4', 1400.8, 'Khóa học fullstack k4', 'Content khóa học fullstack k4', 5, true),
('Fullstack K5', 1400.9, 'Khóa học fullstack k5', 'Content khóa học fullstack k5', 5, true),
('Fullstack K6', 1400.1, 'Khóa học fullstack k6', 'Content khóa học fullstack k6', 5, true),
('Fullstack K7', 1400.12, 'Khóa học fullstack k7', 'Content khóa học fullstack k7', 6, true),
('Fullstack K8', 1400.51, 'Khóa học fullstack k8', 'Content khóa học fullstack k8', 6, true),
('Fullstack K9', 1400.52, 'Khóa học fullstack k9', 'Content khóa học fullstack k9', 6, true);

-- Sửa tên, giá khóa học

UPDATE courses 
SET 
	updated_at = NOW(),
	name = CASE
		WHEN id = 10 THEN 'Khóa học FrontEnd k1'
		WHEN id = 11 THEN 'Khóa học FrontEnd k2'
		WHEN id = 12 THEN 'Khóa học FrontEnd k3'
		WHEN id = 13 THEN 'Khóa học FrontEnd k4'
		WHEN id = 14 THEN 'Khóa học FrontEnd k5'
		WHEN id = 15 THEN 'Khóa học FrontEnd k6'
		WHEN id = 16 THEN 'Khóa học FrontEnd k7'
		WHEN id = 17 THEN 'Khóa học FrontEnd k8'
		WHEN id = 18 THEN 'Khóa học FrontEnd k9'
		ELSE name
	END,
	price = CASE
		WHEN id = 10 THEN 15000.1
		WHEN id = 11 THEN 15000.2
		WHEN id = 12 THEN 15000.3
		WHEN id = 13 THEN 15000.4
		WHEN id = 14 THEN 15000.5
		WHEN id = 15 THEN 15000.6
		WHEN id = 16 THEN 15000.7
		WHEN id = 17 THEN 15000.8
		WHEN id = 18 THEN 15000.9
		ELSE price
	END
WHERE id BETWEEN 10 AND 18;

UPDATE teacher
SET updated_at = NOW(),
	bio = CASE
		WHEN id = 4 THEN 'Tôi là Hoàng An'
		WHEN id = 5 THEN 'Tôi là Sơn Đặng'
		WHEN id = 6 THEN 'Tôi là Hoàng An 2'
		ELSE bio
	END
WHERE id BETWEEN 4 AND 6;

SELECT * FROM teacher;
SELECT * FROM courses;