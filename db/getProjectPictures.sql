select u.full_name,u.img_url from public.user u join proj_user p on u.id=p.user_id join project pr on p.proj_id=pr.id where pr.id=$1 and u.img_url is not null; 
