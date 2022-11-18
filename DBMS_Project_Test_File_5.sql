create database dbms;
use dbms;
create table recruiter (
     Id int primary key auto_increment ,
     first_name varchar(255) NOT NULL ,
     last_name varchar(255) NOT NULL,
     contact varchar(20) NOT NULL
);

create table process (
      Id int PRIMARY KEY AUTO_INCREMENT,
	  description varchar(255),
      recruiter_id int NOT NULL,
      constraint FK_Process_Recruiter foreign key (recruiter_id) references recruiter(Id)
); 

create table step (
     Id int PRIMARY KEY auto_increment NOT NULL,
     name varchar(255)
);
create table process_step (
   Id int PRIMARY KEY auto_increment,
   process_id int NOT NULL,
   step_id int NOT NULL,
   status ENUM('Not started', 'In progress', 'Completed') NOT NULL,
   priority int NOT NULL,
   CONSTRAINT FK_ProcessStep FOREIGN KEY (process_id) REFERENCES process(id),
   CONSTRAINT FK_StepProcess FOREIGN KEY (step_id) REFERENCES step(id)
);

insert into step(name) values
    ('Skill Test'),
    ('Personal Interview'),
    ('HR Interview');

/*ALTER TABLE process_step
MODIFY COLUMN process_id int NOT NULL;

ALTER TABLE process_step
MODIFY COLUMN step_id int NOT NULL;
ALTER TABLE process_step
DROP COLUMN priorty;
ALTER TABLE process_step
ADD COLUMN priority int;
ALTER TABLE process_step
MODIFY COLUMN priority int NOT NULL;
ALTER TABLE process_step
MODIFY COLUMN status ENUM('Not started', 'In progress', 'Completed') NOT NULL;*/


desc process_step;

insert into recruiter values
	(1, 'Abhishek', 'Jain', '7224040807'),
    (2, 'Akash', 'Mahapatra', '7224040607'),
    (3, 'Sachin', 'Kumar','9875634567'),
    (4, 'Upasana', 'Kourav','7224040800'),
	(5, 'Ankit', 'Kumar', 9752933456),
    (6, 'Aman', 'Mishra', 9752934566);
    
    
    
    select * from step;
#-------------------------------------------------------------------------------------------
create table job_category (
   Id int PRIMARY KEY auto_increment,
   name varchar(255) not null,
   description varchar(255)
);


create table job_position (
   Id int PRIMARY KEY auto_increment,
   name varchar(255) not null,
   description varchar(255)
);

create table organization (
   Id int PRIMARY KEY auto_increment,
   name varchar(255) not null,
   description varchar(255)
);

create table job (
   Id int PRIMARY KEY auto_increment,
   name varchar(255) not null,
   description varchar(255),
   date_published datetime not null,
   job_start_date datetime not null,
   no_of_vacancies int NOT NULL,
   job_category_id int	NOT NULL,
   job_position_id int NOT NULL,
   organization_id int NOT NULL,
   process_id int NOT NULL,
   CONSTRAINT FK_JobCategory FOREIGN KEY (job_category_id) references job_category(id),
   CONSTRAINT FK_JobPosition FOREIGN KEY (job_position_id) references job_position(id),
   CONSTRAINT FK_JobOrganization FOREIGN KEY (organization_id) references organization(id),
   constraint FK_Process_Job foreign key (process_id) references process(id)
);
desc job;
/*ALTER TABLE job
MODIFY COLUMN no_of_vacancies int NOT NULL;
ALTER TABLE job
MODIFY COLUMN job_category_id int NOT NULL;

ALTER TABLE job
MODIFY COLUMN job_position_id int NOT NULL;
ALTER TABLE job
MODIFY COLUMN organization_id int NOT NULL;

ALTER TABLE job
MODIFY COLUMN process_id int NOT NULL;*/




create table job_platform (
  Id int primary key not null,
  Job_Id int not null,
  name varchar(255) not null,
  constraint FK_Job_Platform foreign key (Job_Id) references job(Id)
);


insert into job_category values
    (1, 'IT', 'Roles pertaining to technical know how'),
    (2, 'Management', 'Roles with managerial know how'),
    (3, 'Finance', 'Roles pertaining to finance know how'),
    (4, 'Education', 'Roles pertaining to teaching and education know how'),
    (5, 'Consulting', 'Roles pertaining to consulting know how');

    insert into job_position values
    (1, 'IT Manager', 'Well Qualified'),
    (2, 'Sales Manager', 'Well Qualified'),
    (3, 'Vice President', 'Well Qualified'),
    (4, 'Intern', 'Well Qualified'),
    (5, 'Data Analyst', 'Well Qualified'),
    (6, 'Product Manager', 'Well Qualified'),
    (7, 'Business Consultant', 'Well Qualified'),
    (8, 'Software Developer', 'Well Qualified'),
    (9, 'Researcher', 'Well Qualified'),
    (10, 'Engineer Manager', 'Well Qualified'),
    (11, 'Manager', 'Well Qualified');
    
    select * from job_position;
    
    insert into organization values
    (1, 'Walmart', 'Great Company'),
    (2, 'Google', 'Great Company'),
    (3, 'Microsoft', 'Great Company'),
    (4, 'Goldman Sachs', 'Great Company'),
    (5, 'Indeed', 'Great Company'),
    (6, 'Atlassian', 'Great Company'),
    (7, 'Dunzo', 'Great Company');
    
    insert into process values 
    (1, 'Process corresponding to Job with id 1', 1),
    (2, 'Process corresponding to Job with id 2', 2),
    (3, 'Process corresponding to Job with id 3', 4),
    (4, 'Process corresponding to Job with id 4', 6),
    (5, 'Process corresponding to Job with id 5', 6),
    (6, 'Process corresponding to Job with id 6', 2),
    (7, 'Process corresponding to Job with id 7', 3),
    (8, 'Process corresponding to Job with id 8', 4),
    (9, 'Process corresponding to Job with id 9', 1),
    (10,'Process corresponding to Job with id 10', 5);
    
    desc process_step;
    
    insert into process_step values 
    (1, 1, 1, 'Not started', 1),
    (2, 1, 2, 'Not started', 2),
    (3, 1, 3, 'Not started', 3),
    (4, 2, 1, 'Not started', 1),
    (5, 2, 3, 'Not started', 2),
    (6, 3, 1, 'Not started', 1),
    (7, 3, 2, 'Not started', 2),
    (8, 3, 3, 'Not started', 3),
    (9, 4, 1, 'Not started', 1),
    (10, 4, 2, 'Not started', 2),
    (11, 5, 1, 'Not started', 1),
    (12, 5, 2, 'Not started', 2),
    (13, 5, 3, 'Not started', 3),
    (14, 6, 1, 'Not started', 1),
    (15, 6, 2, 'Not started', 2),
    (16, 6, 3, 'Not started', 3),
    (17, 7, 1, 'Not started', 1),
    (18, 7, 3, 'Not started', 2),
    (19, 8, 1, 'Not started', 1),
    (20, 8, 2, 'Not started', 2),
    (21, 8, 3, 'Not started', 3),
    (22, 9, 1, 'Not started', 1),
    (23, 9, 2, 'Not started', 2),
    (24, 10, 1, 'Not started', 1),
    (25, 10, 3, 'Not started', 2);
  
    select * from process_step;
    
    
    insert into job values
    (1, 'Hiring Freshers', 'This job opening is for 2023 fresh grads', '2022-10-21', '2023-06-01', 10, 1, 1, 1, 1),
    (2, 'Hiring Consultant', 'This job opening is for 2022 and before grads', '2022-10-21', '2022-11-01', 5, 2, 1, 2, 2),
    (3, 'Hiring Freshers', 'This job opening is for 2023 fresh grads', '2022-10-21', '2023-06-01', 5, 5, 7, 4, 3),
    (5, 'Hiring Manager', 'This job opening is for peaple with 15+ years of experience', '2022-10-21', '2022-11-01', 2, 1, 3, 6, 5),
    (4, 'Hiring For SDE-3', 'This job opening is for 5+ yoe', '2022-10-28', '2022-12-01', 2, 1, 8, 6, 4),
    (6, 'Hiring Freshers', 'This job opening is for 2023 fresh grads', '2022-10-28', '2023-06-01', 10, 2, 4, 2, 6),
	(7, 'Hiring Researchers', 'This job opening is for all grads', '2022-10-28', '2022-12-01', 4, 4, 9, 3, 7),
    (8, 'Hiring Freshers', 'This job opening is for 2023 fresh grads', '2022-10-28', '2023-07-15', 5, 2, 11, 4, 8),
    (9, 'Hiring Data Analyst', 'This job opening is for people with 5+ yoe', '2022-10-28', '2022-12-15', 4, 1, 5, 1, 9),
    (10, 'Hiring Manager', 'This job opening is for peaple with 15+ years of experience', '2022-10-28', '2023-02-01', 1, 3, 3, 5, 10);
    
    insert into job_platform values
    (1, 1, 'Linkedin'),
    (2, 1, 'Facebook'),
    (3, 1, 'Indeed'),
	(4, 2, 'Linkedin'),
    (5, 2, 'Facebook'),
    (6, 3, 'Indeed'),
	(7, 3, 'Linkedin'),
    (8, 4, 'Facebook'),
    (9, 5, 'Indeed'),
	(10, 5, 'Linkedin'),
    (11, 5, 'Facebook'),
    (12, 6, 'Indeed');
    
    insert into job_platform values
    (13,7,'Facebook'),
    (14,7,'LinkedIn'),
    (15, 8, 'Linkedin'),
    (16, 8, 'Facebook'),
    (17, 8, 'Indeed'),
    (18, 9, 'Linkedin'),
    (19, 9, 'Facebook'),
    (20, 10, 'Indeed');
    
    
  select * from job_platform;
    
    select * from job;
#-------------------------------------------------------------------------------------------
create table applicant (
    Id int PRIMARY KEY auto_increment,
    first_name varchar(255),
    last_name varchar(255),
    email varchar(255),
    phone varchar(255),
    summary varchar(255)
);
/*ALTER TABLE applicant
MODIFY first_name varchar(255) NOT NULL;

ALTER TABLE applicant
MODIFY last_name varchar(255) NOT NULL;

ALTER TABLE applicant
MODIFY email varchar(255) NOT NULL;
ALTER TABLE applicant
MODIFY phone varchar(255) NOT NULL;

ALTER TABLE applicant
MODIFY summary varchar(255) NOT NULL;*/

desc applicant;


create table application (
    Id int primary key auto_increment,
    date_of_application datetime NOT NULL,
    education varchar(255),
    experience varchar(255),
    document binary(100) default 0,
    documents_url varchar(255),
    job_id int NOT NULL,
    applicant_id int NOT NULL,
    constraint FK_JobApplication Foreign Key (job_id) REFERENCES job(Id),
    constraint FK_ApplicantApplication Foreign Key (applicant_id) REFERENCES applicant(Id)
);
/*ALTER TABLE application
MODIFY date_of_application datetime NOT NULL;
ALTER TABLE application
MODIFY job_id int NOT NULL;
ALTER TABLE application
MODIFY applicant_id int NOT NULL;

Alter table application
modify document binary(100) default 0;*/

desc application;

create table interview (
    Id int primary key auto_increment,
    start_time datetime NOT NULL,
    end_time datetime NOT NULL,
    application_id int NOT NULL,
    constraint FK_InterviewApplication foreign key (application_id) references application(id)
);

/*ALTER TABLE interview
MODIFY COLUMN start_time datetime NOT NULL;
ALTER TABLE interview
MODIFY COLUMN end_time datetime NOT NULL;
ALTER TABLE interview
MODIFY COLUMN application_id int NOT NULL;*/

desc interview;



create table interview_note (
    Id int primary key auto_increment,
    notes varchar(255) NOT NULL,
    interview_id int NOT NULL,
    pass bit NOT NULL,
    constraint FK_InterviewNote foreign key (interview_id) references interview(id) 
);
/*ALTER TABLE interview_note
MODIFY COLUMN notes varchar(255) NOT NULL;
ALTER TABLE interview_note
MODIFY COLUMN interview_id int NOT NULL;
ALTER TABLE interview_note
MODIFY COLUMN pass bit NOT NULL;*/

desc interview_note;
alter table interview_note modify column pass int not null;


create table application_test (
   Id int primary key auto_increment,
   application_id int NOT NULL,
   start_time datetime NOT NULL,
   end_time datetime NOT NULL,
   score int CHECK (score>=0 AND score<=100) NOT NULL,
   constraint FK_ApplicationTest foreign key (application_id) references application(id)
);

/*ALTER TABLE application_test
MODIFY COLUMN application_id int  NOT NULL;
ALTER TABLE application_test
MODIFY COLUMN start_time datetime  NOT NULL;
ALTER TABLE application_test
MODIFY COLUMN end_time datetime NOT NULL;
ALTER TABLE application_test
MODIFY COLUMN score int  NOT NULL;*/


  
  desc application_test;
    
    insert into applicant values 
    (1, 'Soumya', 'Shree', 'soumya.shree@gmail.com', '1234567890', 'Student of DBMS Class'),
    (2, 'Vanshika', 'Gupta', 'vanshika.gupta@gmail.com', '1324658790', 'Student of DBMS Class'),
    (3, 'Akhil', 'Agrawal', 'akhil.agrawal@gmail.com', '7224040802', 'Student of DBMS Class'),
    (4, 'Aman', 'Agrawal', 'aman.agrawal@gmail.com', '9989823435', 'Student of DBMS Class'),
    (5, 'Ritika', 'Sharma', 'ritika.gupta@gmail.com', '1234567899', 'Student of DBMS Class'),
    (6, 'Divyam', 'Goyal', 'diyam.goyal@gmail.com', '1324658799', 'Student of DBMS Class'),
    (7, 'Gaurav', 'Bansal', 'gaurav.bansal@gmail.com', '7234040802', 'Student of DBMS Class'),
    (8, 'Charvi', 'Singla', 'charvi.singla@gmail.com', '9879823435', 'Student of DBMS Class'),
    (9, 'Nitish', 'Jindal', 'nitish.jindal@gmail.com', '9889283435', 'Student of DBMS Class'),
    (10, 'Harsh', 'Singh', 'harsh.singla@gmail.com', '7989823435', 'Student of DBMS Class');
    
    select * from application;
    
    insert into application values 
    (1,'2022-10-29','MBBS', '3+ yoe', 1, 'https://www.linkedin.com/in/aman-agrawal-281852192/?originalSubdomain=in', 7, 1),
    (2,'2022-10-30','M.Tech', '5+ yoe', 1, 'https://www.linkedin.com/in/aman-agrawal-281852192/?originalSubdomain=in', 9, 2),
	(3,'2022-10-25','MBA', '2+ yoe', 1, 'https://www.linkedin.com/in/aman-agrawal-281852192/?originalSubdomain=in', 2, 3),
	(4,'2022-11-01','M.Tech', '16+ yoe', 1, 'https://www.linkedin.com/in/aman-agrawal-281852192/?originalSubdomain=in', 5, 4),
    (5,'2022-11-03','B.Tech', '0 yoe', null, null, 1, 5),
    (6,'2022-10-27','BE', '0 yoe', 1, 'https://www.linkedin.com/in/aman-agrawal-281852192/?originalSubdomain=in', 3, 7),
    (7,'2022-10-29','B.Tech', '7+ yoe', 1, 'https://www.linkedin.com/in/aman-agrawal-281852192/?originalSubdomain=in', 4, 8),
    (8,'2022-11-06','MBA', '0 yoe', null, null, 6, 9),
    (9,'2022-11-03','BBA', '0 yoe', null, null, 8, 10),
    (10,'2022-10-28','MBA', '15+ yoe', 1, 'https://www.linkedin.com/in/aman-agrawal-281852192/?originalSubdomain=in', 10, 6);
    
    insert into application values
    (11,'2022-10-28','MBA', '15+ yoe', 1, 'https://www.linkedin.com/in/aman-agrawal-281852192/?originalSubdomain=in', 9, 6),
    (12,'2022-10-28','MBA', '15+ yoe', 1, 'https://www.linkedin.com/in/aman-agrawal-281852192/?originalSubdomain=in', 3, 6),
    (13,'2022-10-28','MBA', '15+ yoe', 1, 'https://www.linkedin.com/in/aman-agrawal-281852192/?originalSubdomain=in', 6, 5),
    (14,'2022-10-28','MBA', '15+ yoe', 1, 'https://www.linkedin.com/in/aman-agrawal-281852192/?originalSubdomain=in', 4, 3),
    (15,'2022-10-28','MBA', '15+ yoe', 1, 'https://www.linkedin.com/in/aman-agrawal-281852192/?originalSubdomain=in', 4, 5);
    
    
    insert into interview values 
    (1,'2022-10-31 10:30:00', '2022-10-31 11:30:00',1),
    (2,'2022-11-01 12:00:00', '2022-11-01 14:00:00',2),
    (3,'2022-10-27 10:30:00', '2022-10-27 11:30:00',3),
	(4,'2022-11-03 12:00:00', '2022-11-03 14:00:00',4),
    (5,'2022-11-05 10:30:00', '2022-11-05 11:30:00',5),
    (6,'2022-10-29 12:00:00', '2022-10-29 14:00:00',6),
    (7,'2022-10-31 10:30:00', '2022-10-31 11:30:00',7),
	(8,'2022-11-08 12:00:00', '2022-11-08 14:00:00',8),
    (9,'2022-11-05 10:30:00', '2022-11-05 11:30:00',9),
	(10,'2022-10-31 12:00:00', '2022-10-31 14:00:00',10);
    
    insert into interview_note values
    (1,'Answered almost all the queries, qualified for the company',1,1),
    (2,'Not Qualified',2,0),
    (3,'Answered almost all the queries, schedule bonus round',3,1),
    (4,'Not upto the mark',4,0),
    (5,'Lack of confidence and presentation',5,0),
    (6,'Brilliant portray of skills and self',6,1),
    (7,'Answered almost all the questions confidently',7,1),
    (8,'Poor preparation',8,0),
    (9,'Satisfactory responses',9,1),
    (10,'Good fit for the team',10,1);
    
    insert into application_test values 
    (1, 1, '2022-10-30 08:00:00', '2022-10-30 09:00:00', 89),
    (2, 2, '2022-10-31 16:00:00', '2022-10-31 17:00:00', 45),
    (3, 3, '2022-10-26 08:00:00', '2022-10-26 09:00:00', 78),
	(4, 4, '2022-11-02 16:00:00', '2022-11-02 17:00:00', 25),
    (5, 5, '2022-11-04 08:00:00', '2022-11-04 09:00:00', 67),
    (6, 6, '2022-10-28 16:00:00', '2022-10-28 17:00:00', 86),
    (7, 7, '2022-10-30 08:00:00', '2022-10-30 09:00:00', 55),
    (8, 8, '2022-11-07 16:00:00', '2022-11-07 17:00:00', 47),
    (9, 9, '2022-11-04 08:00:00', '2022-11-04 09:00:00', 95),
    (10, 10, '2022-10-30 16:00:00', '2022-10-30 17:00:00', 90);
    
    update application_test set score = 85 where application_id = 2;
    
    desc interview_note;
    
    select * from interview_note;
    
    insert into job(name, description, date_published, job_start_date, no_of_vacancies, job_category_id, job_position_id, organization_id, process_id) values ("testy", "test", "2022-11-16 00:00:00", "2022-11-24 00:00:00", 6, 3, 1, 3, 11);