
-- Users
INSERT INTO users (username, email, password) VALUES
('john_doe', 'john.doe@example.com', 'password'),
('jane_smith', 'jane.smith@example.com', 'password'),
('mike_jackson', 'mike.jackson@example.com', 'password'),
('sara_williams', 'sara.williams@example.com', 'password'),
('chris_brown', 'chris.brown@example.com', 'password');


-- Timelines
INSERT INTO timelines (title, description, image, user_id) VALUES
('Wellness and Fitness', 'Timeline focusing on health, fitness, and personal wellness goals.', 'wellness_fitness_image.jpg', 3), --1
('Social Gatherings', 'Timeline highlighting social events and gatherings with friends and family.', 'social_gatherings_image.jpg', 4), --2
('Test Timeline', 'Test Timeline Description', 'beachtrip1.jpg', 2), --3
('Career Transitions', 'Timeline documenting key career transitions and milestones.', 'career_transitions_image.jpg', 2), --4
('Programming Journey', 'Timeline tracking my journey into programming and software development.', 'programming_journey_image.jpg', 1), --5
('Family Adventures', 'Timeline capturing memorable family trips and events.', 'family_adventures_image.jpg', 1); --6


-- Milestones
INSERT INTO milestones (timeline_id, title, date, diary_entry, image1, image2, image3, image4) VALUES
(1, 'Improved Diet', '2023-01-02', 'Adopted a healthier diet and lifestyle.', 'diet1.jpg', 'diet2.jpg', 'diet3.jpg', 'diet4.jpg'),
(1, 'Started Yoga Classes', '2023-01-10', 'Began attending yoga classes for physical and mental well-being.', 'yoga1.jpg', 'yoga2.jpg', 'yoga3.jpg', NULL),
(1, 'Completed First 10K Run', '2023-03-20', 'Successfully completed my first 10K run.', 'running1.jpg', 'running2.jpg', NULL, NULL),

(2, 'Hosted Dinner Party', '2023-09-10', 'Hosted a dinner party for friends. It was a success, and everyone enjoyed the food and company.', 'dinnerparty1.jpg', 'dinnerparty2.jpg', NULL, NULL),
(2, 'Attended Wedding', '2023-12-25', 'Attended a friend''s wedding. It was a beautiful ceremony.', 'wedding1.jpg', 'wedding2.jpg', NULL, NULL),

(4, 'Changed Job', '2022-01-15', 'Started a new job as a software engineer.', 'newjob1.jpg', NULL, NULL, NULL),
(4, 'Promotion', '2022-05-01', 'Got promoted to a senior developer position. Hard work pays off!', 'promotion1.jpg', NULL, NULL, NULL),
(4, 'Completed Certification', '2022-07-20', 'Successfully completed a certification course in software development.', NULL, NULL, NULL, NULL),

(5, 'Started Learning Programming', '2021-01-10', 'Today marks the beginning of my journey into programming.', 'programmingimage1.jpg', 'programmingimage2.jpg', 'programmingimage3.jpg', 'programmingimage4.jpg'),
(5, 'First Coding Challenge Completed', '2021-03-20', 'Completed my first coding challenge today.', 'programmingimage1.jpg', 'programmingimage2.jpg', NULL, NULL),
(5, 'First Programming Project', '2021-04-05', 'Completed my first programming project. It was challenging but rewarding.', 'programmingimage3.jpg', NULL, NULL, NULL),

(6, 'Family Trip to the Mountains', '2021-07-10', 'Spent a week with family in the mountains. Enjoyed the beautiful scenery and quality time together.', 'mountaintrip1.jpg', 'mountaintrip2.jpg', 'mountaintrip3.jpg', 'mountaintrip4.jpg'),
(6, 'Beach Vacation with Family', '2021-09-05', 'Had a fantastic beach vacation with family. Lots of sun, sand, and laughter!', 'beachtrip1.jpg', 'beachtrip2.jpg', 'beachtrip3.jpg', NULL),
(6, 'Celebrated Parents'' Anniversary', '2021-11-12', 'Celebrated my parents'' anniversary with a special dinner. Grateful for their love and support.', 'anniversary1.jpg', 'anniversary2.jpg', NULL, NULL);


-- Favourites
INSERT INTO favourites (user_id, timeline_id) VALUES
(1, 2), -- John Doe (user_id: 1) favorites the timeline with id 2
(1, 5), -- John Doe (user_id: 1) favorites the timeline with id 5
(2, 1), -- Jane Smith (user_id: 2) favorites the timeline with id 1
(3, 1), -- Mike Jackson (user_id: 3) favorites the timeline with id 1
(4, 1); -- Sara Williams (user_id: 4) favorites the timeline with id 1


-- Followings
INSERT INTO followings (user1_id, user2_id) VALUES
(1, 2), -- John Doe (user1_id: 1) follows Jane Smith (user2_id: 2)
(1, 3), -- John Doe (user1_id: 1) follows Mike Jackson (user2_id: 3)
(2, 4), -- Jane Smith (user1_id: 2) follows Sara Williams (user2_id: 4)
(3, 1), -- Mike Jackson (user1_id: 3) follows John Doe (user2_id: 1)
(4, 2); -- Sara Williams (user1_id: 3) follows Jane Smith (user2_id: 1)
