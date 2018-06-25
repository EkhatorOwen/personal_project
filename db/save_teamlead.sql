--INSERT INTO public.user (job_title) VALUES ($1);
UPDATE public.user SET job_title = $1 WHERE authid = $2 RETURNING *;



