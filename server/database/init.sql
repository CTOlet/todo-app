-- functions
CREATE FUNCTION modify_updated_at()
RETURNS TRIGGER AS
$$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$
LANGUAGE 'plpgsql';

-- tables
CREATE TABLE public.todos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamp DEFAULT now() NOT NULL,
  updated_at timestamp DEFAULT now() NOT NULL,
  status text NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  CONSTRAINT status CHECK (status IN ('open', 'closed'))
);

-- triggers
CREATE TRIGGER modify_updated_at_trigger
  BEFORE UPDATE
  ON public.todos
  FOR EACH ROW
EXECUTE PROCEDURE modify_updated_at();

-- initial data
INSERT INTO public.todos 
  (status, title, description)
VALUES
  ('open', 'Task 1', 'Description of task 1.'),
  ('closed', 'Task 2', 'Description of task 2.'),
  ('open', 'Task 3', 'Description of task 3.');