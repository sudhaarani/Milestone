
-- Users
INSERT INTO users (username, email, password) VALUES
('john_doe', 'john.doe@example.com', 'password'), --user id: 1
('jane_smith', 'jane.smith@example.com', 'password'), --user id: 2
('mike_wazowski', 'mike.wazowski@example.com', 'password'), --user id:3
('sara_williams', 'sara.williams@example.com', 'password'), --user id: 4
('charlie_brown', 'charlie.brown@example.com', 'password'); --user id: 5


-- Timelines
INSERT INTO timelines (title, description, image, user_id) VALUES
('Cooking Escapades', 'Chronicling my culinary adventures and experiments in the kitchen.', 'cooking_escapades_cover.jpg', 2), --1
('Book Club Reads', 'Tracking the books read and discussed in my book club meetings.', 'book_club_reads_cover.jpg', 2), --2
('Improving My Art', 'Timeline showcasing artworks I created as I learn to use various mediums and techniques.', 'my_art_cover.jpg', 4), --3
('Fitness Challenges', 'Timeline recording my personal fitness records and achievements.', 'fitness_challenges_cover.jpg', 3), --5
('Gardening Diary', 'Following the growth and care of various plants in my garden.', 'gardening_diary_cover.jpg', 4), --6
('Learning different Languages & Cultures', 'Timeline documenting the journey of learning new languages and cultures.', 'learning_languages_cover.jpg', 5), --7
('DIY Projects', 'Timeline showcasing do-it-yourself projects and home improvements.', 'diy_projects_cover.jpg', 2), --8
('Healthier Habits', 'Timeline focusing on cultivating healthier habits in daily life.', 'healthier_habits_cover.jpg', 4), --9
('Music Discoveries', 'Timeline exploring new music genres and artists.', 'music_discoveries_cover.jpg', 5), --10
('Film Geek Diary 2024', 'Diary for all the new movies I will watch in 2024 and my thoughts on them.', 'film_geek_cover.jpg', 2), --11
('Rocky''s Milestones', 'Documenting the milestonse and adventures of my dog Rocky', 'rockys_milestones_cover.jpg', 3), --12
('Outdoor Excursions', 'Timeline capturing outdoor adventures and exploration.', 'outdoor_excursions_cover.jpg', 5), --13
('Home Renovation Journey', 'Timeline documenting the renovation journey of my home.', 'home_renovation_cover.jpg', 2), --14
('Yoga Progress', 'Timeline tracking my progress and milestones in yoga practice.', 'yoga_progress_cover.jpg', 3), --15
('Mindfulness Moments', 'Diary of my reflection during my mindfulness practices.', 'mindfulness_moments_cover.jpg', 3), --16
('My Business Venture', 'Timeline chronicling my journey of starting and running my gym business.', 'business_venture_cover.jpg', 3), --17
('Marriage Album', 'Important milestones and moments of my husband Mark and I in our marriage.', 'marriage_album_cover.jpg', 4),
('Travel Diaries', 'Timeline documenting my travel experiences from around the world as I visit new countries.', 'travel_diaries_cover.jpg', 5), 
('Wellness and Fitness', 'Timeline focusing on health, fitness, and personal wellness goals.', 'wellness_fitness_cover.jpg', 3), --19
('Lucas''s Baby Milestones', 'Timeline documenting the milestones of my 6 month old son Lucas.', 'lucas_milestones_cover.jpg', 4), --20
('My Career Milestones', 'Diary to document my key career milestones and transitions.', 'career_transitions_cover.jpg', 2), --21
('My Programming Journey', 'Timeline tracking my journey into programming and software development.', 'programming_journey_cover.jpg', 1), --22
('Doe Family Adventures', 'Timeline capturing memorable milestones of my family''s trips and events.', 'family_adventures_cover.jpg', 1); --23



-- Milestones
INSERT INTO milestones (timeline_id, title, date, diary_entry, image1, image2, image3, image4) VALUES
(19, 'Improved Diet', '2023-01-02', 'Adopted a healthier diet and lifestyle.', 'diet1.jpg', 'diet2.jpg', 'diet3.jpg', 'diet4.jpg'),
(19, 'Started Yoga Classes', '2023-01-10', 'Began attending yoga classes for physical and mental well-being.', 'yoga1.jpg', 'yoga2.jpg', 'yoga3.jpg', NULL),
(19, 'Completed First 10K Run', '2023-03-20', 'Successfully completed my first 10K run.', 'running1.jpg', 'running2.jpg', NULL, NULL),
(19, 'Daily Meditation Practice', '2023-04-05', 'Started a daily meditation practice for mental clarity and relaxation.', NULL, NULL, NULL, NULL),
(19, 'Joined a Gym', '2023-05-15', 'Joined a local gym to incorporate strength training into my fitness routine.', NULL, NULL, NULL, NULL),
(19, 'Healthy Cooking Workshop', '2023-06-10', 'Attended a workshop on healthy cooking to improve my culinary skills.', NULL, NULL, NULL, NULL),
(19, 'Completed 20K Run', '2023-07-25', 'Achieved a new milestone by completing a 20K run.', NULL, NULL, NULL, NULL),
(19, 'Introduction to CrossFit', '2023-09-05', 'Explored CrossFit training for a diverse fitness experience.', NULL, NULL, NULL, NULL),
(19, 'Hiking Trip', '2023-10-20', 'Went on a challenging hiking trip to connect with nature and test endurance.', NULL, NULL, NULL, NULL),
(19, 'Mindful Eating Practice', '2023-12-10', 'Started practicing mindful eating to develop a healthier relationship with food.', NULL, NULL, NULL, NULL),
(19, 'Completed First Half Marathon', '2024-02-15', 'Accomplished the goal of running my first half marathon.', NULL, NULL, NULL, NULL),

(20, 'Lucas''s First Words', '2023-03-15', 'Lucas said his first word today - ''mama''! It melted our hearts to hear his sweet voice.', NULL, NULL, NULL, NULL),
(20, 'Lucas''s First Steps', '2023-06-20', 'Today, Lucas took his first steps all by himself! It was an exciting moment for the whole family as he confidently took those wobbly steps towards his favorite toy.', NULL, NULL, NULL, NULL),
(20, 'Lucas''s First Birthday', '2024-12-10', 'Happy 1st Birthday, Lucas! I love watching you grow and learn during your first year. Here''s to many more adventures together!', 'first_birthday.jpg', 'first_birthday2.jpg', NULL, NULL),

(21, 'Changed Job', '2022-01-15', 'Started a new job as a software engineer.', 'newjob1.jpg', NULL, NULL, NULL),
(21, 'Promotion', '2022-05-01', 'Got promoted to a senior developer position. Hard work pays off!', 'promotion1.jpg', NULL, NULL, NULL),
(21, 'Completed Certification', '2022-07-20', 'Successfully completed a certification course in software development.', NULL, NULL, NULL, NULL),

(22, 'Started Learning Programming', '2021-01-10', 'Today marks the beginning of my journey into programming.', 'programmingimage1.jpg', 'programmingimage2.jpg', 'programmingimage3.jpg', 'programmingimage4.jpg'),
(22, 'First Coding Challenge Completed', '2021-03-20', 'Completed my first coding challenge today.', 'programmingimage1.jpg', 'programmingimage2.jpg', NULL, NULL),
(22, 'First Programming Project', '2021-04-05', 'Completed my first programming project. It was challenging but rewarding.', 'programmingimage3.jpg', NULL, NULL, NULL),

(23, 'Family Trip to the Mountains', '2021-07-10', 'Spent a week with family in the mountains. Enjoyed the beautiful scenery and quality time together.', 'mountaintrip1.jpg', 'mountaintrip2.jpg', 'mountaintrip3.jpg', 'mountaintrip4.jpg'),
(23, 'Beach Vacation with Family', '2021-09-05', 'Had a fantastic beach vacation with family. Lots of sun, sand, and laughter!', 'beachtrip1.jpg', 'beachtrip2.jpg', 'beachtrip3.jpg', NULL),
(23, 'Celebrated Parents'' Anniversary', '2021-11-12', 'Celebrated my parents'' anniversary with a special dinner. Grateful for their love and support.', 'anniversary1.jpg', 'anniversary2.jpg', NULL, NULL);


-- Favourites
INSERT INTO favourites (user_id, timeline_id) VALUES
(2, 1), -- Jane Smith (user_id: 2) favorites the timeline with id 1
(3, 1), -- Mike Jackson (user_id: 3) favorites the timeline with id 1
(4, 1); -- Sara Williams (user_id: 4) favorites the timeline with id 1


-- Followings
INSERT INTO followings (user1_id, user2_id) VALUES
(2, 4), -- Jane Smith (user1_id: 2) follows Sara Williams (user2_id: 4)
(3, 1), -- Mike Jackson (user1_id: 3) follows John Doe (user2_id: 1)
(4, 2); -- Sara Williams (user1_id: 3) follows Jane Smith (user2_id: 1)
