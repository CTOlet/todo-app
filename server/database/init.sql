CREATE TABLE public.todos (
  id UUID primary key default gen_random_uuid(),
  created_at timestamp default now(),
  "status" text not null,
  title text not null,
  "description" text not null,
  constraint "status" check ("status" in ('open', 'closed'))
);

INSERT INTO public.todos 
  ("status", title, "description")
VALUES
  ('open', 'Task 1', 'Description of task 1.'),
  ('closed', 'Task 2', 'Description of task 2.'),
  ('open', 'Task 3', 'Description of task 3.');