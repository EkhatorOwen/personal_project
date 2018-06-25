select p.id, p.name, p.description, p.org_id, p.created_at from project p join proj_user pr on p.id=pr.proj_id join public.user u on pr.user_id=u.id where u.id=$1;