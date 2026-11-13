DROP TABLE IF EXISTS project_categories CASCADE;
DROP TABLE IF EXISTS projects CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS organizations CASCADE;

CREATE TABLE organizations (
	organization_id SERIAL PRIMARY KEY,
	name VARCHAR(150) NOT NULL,
	description TEXT NOT NULL,
	contact_email VARCHAR(255) NOT NULL,
	logo_filename VARCHAR(255) NOT NULL
);

CREATE TABLE categories (
	category_id SERIAL PRIMARY KEY,
	name VARCHAR(100) NOT NULL UNIQUE,
	description TEXT NOT NULL
);

CREATE TABLE projects (
	id SERIAL PRIMARY KEY,
	organization_id INT NOT NULL REFERENCES organizations(organization_id) ON DELETE CASCADE,
	title VARCHAR(150) NOT NULL,
	description TEXT NOT NULL,
	location VARCHAR(150) NOT NULL,
	event_date DATE NOT NULL
);

CREATE TABLE project_categories (
	project_id INT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
	category_id INT NOT NULL REFERENCES categories(category_id) ON DELETE CASCADE,
	PRIMARY KEY (project_id, category_id)
);

INSERT INTO organizations (name, description, contact_email, logo_filename) VALUES
('BrightFuture Builders', 'A nonprofit focused on improving community infrastructure through sustainable construction projects.', 'info@brightfuturebuilders.org', 'brightfuture-logo.png'),
('GreenHarvest Growers', 'An urban farming collective promoting food sustainability and education in local neighborhoods.', 'contact@greenharvest.org', 'greenharvest-logo.png'),
('UnityServe Volunteers', 'A volunteer coordination group support local charities and service initiatives.', 'hello@unityserve.org', 'unityserve-logo.png');

INSERT INTO categories (name, description) VALUES
('Infrastructure', 'Projects improving community buildings, public spaces, and physical and facilities.'),
('Education', 'Programs focused on tutoring, workshops, and youth skill-building.'),
('Environment', 'Conservation, tree planting, cleaning, and sustainability initiatives.'),
('Community Support', 'Aid for local families, food drives, and shelter support.'),
('Food Security', 'Urban farming, community gardens, and nutritional distribution.');

INSERT INTO projects (organization_id, title, description, location, event_date) VALUES
(1, 'Community Center Roof Repair', 'Replacing damaged roofing tiles and reinforcing insulation on the local youth center.', 'Downtown Community Hall', '2026-06-12'),
(1, 'Accessible Ramp Installation', 'Building a wheelchair-accessible wooden ramp for the municipal library entrance.', 'Central Public Library', '2026-06-19'),
(1, 'Park Benches Refurbishment', 'Sanding, treating, and repainting wooden benches across the city park.', 'Riverside Park', '2026-07-03'),
(1, 'Community Garden Shed Build', 'Constructing a secure storage shed for gardening tools and equipment.', 'Eastside Plot', '2026-07-15'),
(1, 'Shelter Window Weatherproofing', 'Installing double-pane insulation and weather stripping for winter prep.', 'Hope Family Shelter', '2026-08-01'),

(2, 'Urban Rooftop Garden Setup', 'Installing raised planter boxes and drip irrigation systems on a commercial rooftop.', 'Downtown Innovation Hub', '2026-06-10'),
(2, 'Composting Workshop & Build', 'Building a multi-bin community composting station and teaching proper techniques.', 'Northside Community Plot', '2026-06-18'),
(2, 'Schoolyard Vegetable Patch', 'Creating raised beds and planting seasonal vegetables with elementary students.', 'Lincoln Elementary', '2026-06-25'),
(2, 'Rain Barrel Harvesting System', 'Setting up gutter-fed rain collection barrels for sustainable garden watering.', 'GreenHarvest Greenhouse', '2026-07-08'),
(2, 'Seed Saving & Exchange Fair', 'Hosting a community workshop on harvesting, storing, and trading heirloom seeds.', 'Community Center Annex', '2026-07-22'),

(3, 'Senior tech Support Day', 'Providing one-on-one technology coaching and smartphone assistance for seniors.', 'Sunset Senior Center', '2026-06-14'),
(3, 'Neighborhood Food Drive', 'Collecting, sorting, and packing non-perishable food items for local pantries.', 'St. Jude Community Hall', '2026-06-21'),
(3, 'Winter Coat & Blanket Sorting', 'Organizing donated winter wear to prepare for distribution to families in need.', 'UnityServe Headquarters', '2026-07-05'),
(3, 'Youth Mentorship Sports Day', 'Organizing soccer drills, games, and team-building activities for local youth.', 'City Athletic Fields', '2026-07-19'),
(3, 'Neighborhood Clean-Up Sweep', 'Gathering volunteers to pick up litter and clear pathways around the district.', 'West End District', '2026-08-05');

INSERT INTO project_categories (project_id, category_id) VALUES
(1, 1), (1, 4),
(2, 1), (2, 4),
(3, 1),
(4, 1), (4, 3),
(5, 1), (5, 4),
(6, 3), (6, 5),
(7, 3), (7, 5),
(8, 2), (8, 5),
(9, 3),
(10, 2), (10, 5),
(11, 2), (11, 4),
(12, 4), (12, 5),
(13, 4),
(14, 2), (14, 4),
(15, 3), (15, 4);