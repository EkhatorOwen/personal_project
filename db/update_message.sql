update message m set title=$1, body=$2 from public.user u where m.user_id=u.id and user_id=$3 and m.id=$4;
