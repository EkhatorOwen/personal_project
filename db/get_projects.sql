select name, description, created_at
from project
where org_id=$1;