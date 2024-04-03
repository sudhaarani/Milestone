
-- Users
INSERT INTO users (username, email, password) VALUES
('john_doe', 'john.doe@example.com', 'password'),
('jane_smith', 'jane.smith@example.com', 'password'),
('mike_jackson', 'mike.jackson@example.com', 'password'),
('sara_williams', 'sara.williams@example.com', 'password'),
('chris_brown', 'chris.brown@example.com', 'password');

-- Timelines
INSERT INTO timelines (title, description, image, user_id) VALUES
('Programming Journey', 'Timeline tracking my journey into programming and software development.', 'programming_journey_image.jpg', 1),
('Family Adventures', 'Timeline capturing memorable family trips and events.', 'family_adventures_image.jpg', 1),
('Career Transitions', 'Timeline documenting key career transitions and milestones.', 'career_transitions_image.jpg', 2),
('Wellness and Fitness', 'Timeline focusing on health, fitness, and personal wellness goals.', 'wellness_fitness_image.jpg', 3),
('Social Gatherings', 'Timeline highlighting social events and gatherings with friends and family.', 'social_gatherings_image.jpg', 4);

-- Milestones
INSERT INTO milestones (timeline_id, title, date, diary_entry, image1, image2, image3, image4) VALUES
(1, 'Started Learning Programming', '2021-01-10', 'Today marks the beginning of my journey into programming.', NULL, NULL, NULL, NULL),
(1, 'First Coding Challenge Completed', '2021-03-20', 'Completed my first coding challenge today.', NULL, NULL, NULL, NULL),
(1, 'First Programming Project', '2021-04-05', 'Completed my first programming project. It was challenging but rewarding.', NULL, NULL, NULL, NULL),
(2, 'Family Trip to the Mountains', '2021-07-10', 'Spent a week with family in the mountains. Enjoyed the beautiful scenery and quality time together.', 'mountain_trip_image1.jpg', 'mountain_trip_image2.jpg', NULL, NULL),
(2, 'Beach Vacation with Family', '2021-09-05', 'Had a fantastic beach vacation with family. Lots of sun, sand, and laughter!', 'beach_vacation_image1.jpg', 'beach_vacation_image2.jpg', NULL, NULL),
(2, 'Celebrated Parents'' Anniversary', '2021-11-12', 'Celebrated my parents'' anniversary with a special dinner. Grateful for their love and support.', 'parents_anniversary_image1.jpg', NULL, NULL, NULL),
(3, 'Changed Job', '2022-01-15', 'Started a new job as a software engineer.', NULL, NULL, NULL, NULL),
(3, 'Promotion', '2022-05-01', 'Got promoted to a senior developer position. Hard work pays off!', NULL, NULL, NULL, NULL),
(3, 'Completed Certification', '2022-07-20', 'Successfully completed a certification course in software development.', NULL, NULL, NULL, NULL),
(4, 'Started Yoga Classes', '2023-01-10', 'Began attending yoga classes for physical and mental well-being.', NULL, NULL, NULL, NULL),
(4, 'Completed First 10K Run', '2023-03-20', 'Successfully completed my first 10K run.', '10k_run_image.jpg', NULL, NULL, NULL),
(4, 'Improved Diet', '2023-05-05', 'Adopted a healthier diet and lifestyle.', NULL, NULL, NULL, NULL),
(5, 'Hosted Dinner Party', '2023-09-10', 'Hosted a dinner party for friends. It was a success, and everyone enjoyed the food and company.', 'dinner_party_image1.jpg', 'dinner_party_image2.jpg', NULL, NULL),
(5, 'Attended Wedding', '2023-12-25', 'Attended a friend''s wedding. It was a beautiful ceremony.', 'wedding_image1.jpg', 'wedding_image2.jpg', NULL, NULL);

-- Favourites
INSERT INTO favourites (user_id, milestone_id) VALUES
(1, 2), -- John Doe (user_id: 1) favorites the milestone with id 2
(1, 5), -- John Doe (user_id: 1) favorites the milestone with id 5
(2, 7), -- Jane Smith (user_id: 2) favorites the milestone with id 7
(3, 10), -- Mike Jackson (user_id: 3) favorites the milestone with id 10
(4, 13); -- Sara Williams (user_id: 4) favorites the milestone with id 13

-- Followings
INSERT INTO followings (user1_id, user2_id) VALUES
(1, 2), -- John Doe (user1_id: 1) follows Jane Smith (user2_id: 2)
(1, 3), -- John Doe (user1_id: 1) follows Mike Jackson (user2_id: 3)
(2, 4), -- Jane Smith (user1_id: 2) follows Sara Williams (user2_id: 4)
(3, 1), -- Mike Jackson (user1_id: 3) follows John Doe (user2_id: 1)
(4, 2); -- Sara Williams (
