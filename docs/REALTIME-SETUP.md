# Realtime setup

The live room uses Supabase Realtime Presence + Broadcast so members on different devices can share the same room.

## 1. Create a Supabase project

Create a project in Supabase and open the project's Connect/API settings.

## 2. Get the public client values

Use the project URL and the publishable key. Do not use a secret/service-role key in the browser.

## 3. Add Vercel environment variables

In the Vercel project settings, add:

```
VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=YOUR_PUBLISHABLE_KEY
```

Apply them to Production and Preview as needed, then redeploy.

## 4. Realtime channel

The prototype uses a public Realtime channel named `defend:<ROOM_CODE>`.

Presence tracks:
- client id
- display name
- controller/member role
- join timestamp

Broadcast events:
- `request_snapshot`
- `snapshot`
- `start`
- `answer`
- `settings`

## 5. Test

Open the deployed site on two different devices.

1. Device A: Create room.
2. Device A: enter a name and join.
3. Device B: Join using the same room code and a different name.
4. Both should show the same joined-member list.
5. Device A starts the AI defense.
6. Both devices should receive the same question and turn.
7. When the answering member submits, the answer should appear in both feeds.
8. The next answering member should update on both devices.

For production, replace the public-channel prototype with authenticated/private Realtime channels and room-membership authorization.
