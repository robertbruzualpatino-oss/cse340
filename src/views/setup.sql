DROP TABLE IF EXISTS public.projects CASCADE;
DROP TABLE IF EXISTS public.categories CASCADE;
DROP TABLE IF EXISTS public.organizations CASCADE;

CREATE TABLE organizations (
	organization_id SERIAL PRIMARY KEY,
	name VARCHAR(150) NOT NULL,
	description TEXT NOT NULL,
	contact_email VARCHAR(255) NOT NULL,
	logo_filename VARCHAR(255) NOT NULL
);

INSERT INTO organizations (name, description, contact_email, logo_filename) VALUES
('BrightFuture Builders', 'A nonprofit focused on improving community infrastructure through sustainable construction projects.', 'info@brightfuturebuilders.org', 'brightfuture-logo.png'),
('GreenHarvest Growers', 'An urban farming collective promoting food sustainability and education in local neighborhoods.', 'contact@greenharvest.org', 'greenharvest-logo.png'),
('UnityServe Volunteers', 'A volunteer coordination group supporting local charities and service initiatives.', 'hello@unityserve.org', 'unityserve-logo.png');

CREATE TABLE public.categories (
	category_id SERIAL PRIMARY KEY,
	category_name VARCHAR(100) NOT NULL UNIQUE
);

INSERT INTO public.categories (category_name) VALUES
('Environmental'),
('Educational'),
('Community Service'),
('Health and Wellness');

CREATE TABLE public.projects (
	project_id SERIAL PRIMARY KEY,
	title VARCHAR(150) NOT NULL,
	description TEXT NOT NULL
);

INSERT INTO public.projects (title, description) VALUES
('Park Cleanup', 'Join us to clean up local parks and make them beautiful!'),
('Food Drive', 'Help collect and distribute food to those in need.'),
('Community Tutoring', 'Volunteer to tutor students in various subjects.');