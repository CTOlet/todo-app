CREATE TABLE public.todos (
  id int PRIMARY KEY,
  title varchar(255),
  details varchar(255)
);

INSERT INTO public.todos 
  (id, title, details)
VALUES
  (1, 'Title 1', 'Details 1'),
  (2, 'Title 2', 'Details 2'),
  (3, 'Title 3', 'Details 3');