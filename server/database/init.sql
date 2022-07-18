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
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamp DEFAULT now() NOT NULL,
  updated_at timestamp DEFAULT now() NOT NULL,
  username text NOT NULL UNIQUE,
  password text NOT NULL
);

CREATE TABLE todos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users NOT NULL,
  created_at timestamp DEFAULT now() NOT NULL,
  updated_at timestamp DEFAULT now() NOT NULL,
  status text NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  CONSTRAINT status CHECK (status IN ('open', 'closed'))
);

-- triggers
CREATE TRIGGER modify_updated_at_trigger_users
  BEFORE UPDATE
  ON users
  FOR EACH ROW
EXECUTE PROCEDURE modify_updated_at();

CREATE TRIGGER modify_updated_at_trigger_todos
  BEFORE UPDATE
  ON todos
  FOR EACH ROW
EXECUTE PROCEDURE modify_updated_at();