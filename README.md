# Remix tRPC

A template for Remix with tRPC and other lib to fast start a application.

## stack

- trpc
- remix
- prisma
- sqlite

## usage

```sh
git clone https://github.com/yyong008/remix-trpc.git # clone

pnpm install # install deps

pnpm dev # server dev

pnpm build # build

pnpm start # production start

npx prisma db pull # turn your database schema into a Prisma schema.

npx prisma generate # generate the Prisma Client. You can then start querying your database.
```

## get data in loader

```ts
export const loader = async () => {
  const caller = appRouter.createCaller({})
  const data = await caller.users.get()
  return json({ users: data })
}
```

## get data use client

```tsx
<Button onClick={async () => {
        const d = await client.users.get.query();
        console.log(d)
      }}>get users</Button>
```

## 功能

- 增删改查
- 分页
- 排序
