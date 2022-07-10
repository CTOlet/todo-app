CREATE TABLE public.todos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title varchar(255),
  "description" varchar(255)
);

INSERT INTO public.todos 
  (title, "description")
VALUES
  ('Title 1', 'Description 1'),
  ('Title 2', 'Description 2'),
  ('Title 3', 'Description 3');