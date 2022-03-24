CREATE TABLE public.todos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title varchar(255),
  details varchar(255)
);

INSERT INTO public.todos 
  (title, details)
VALUES
  ('Title 1', 'Details 1'),
  ('Title 2', 'Details 2'),
  ('Title 3', 'Details 3');