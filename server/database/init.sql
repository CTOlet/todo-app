CREATE TABLE public.todos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "status" TEXT NOT NULL,
  title TEXT NOT NULL,
  "description" TEXT NOT NULL,
  CONSTRAINT "status" CHECK ("status" IN ('open', 'closed'))
);

INSERT INTO public.todos 
  ("status", title, "description")
VALUES
  ('open', 'Task 1', 'Description of task 1.'),
  ('closed', 'Task 2', 'Description of task 2.'),
  ('open', 'Task 3', 'Description of task 3.');