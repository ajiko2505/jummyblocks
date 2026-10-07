create or replace function public.grant_owner_admin()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if lower(new.email) = 'snapknowledge101@gmail.com' then
    insert into public.user_roles(user_id, role) values (new.id, 'admin') on conflict do nothing;
  end if;
  return new;
end $$;
revoke execute on function public.grant_owner_admin() from public, anon, authenticated;
create trigger on_auth_user_created_owner_admin after insert on auth.users
for each row execute function public.grant_owner_admin();