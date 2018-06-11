INSERT INTO public.user
    ( name, full_name, lead, email, authid,img_url)
VALUES
    ($1, $2, TRUE, $3, $4, $5)
RETURNING *;