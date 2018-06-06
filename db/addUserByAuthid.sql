INSERT INTO public.user ( name, full_name, lead, email,  authid)
VALUES ($1,$2,TRUE,$3,$4) RETURNING *;