import { PageContainer, ProCard, ProTable } from "@ant-design/pro-components";
import { ActionFunction, ActionFunctionArgs, json } from "@remix-run/node";
import { useFetcher, useLoaderData } from "@remix-run/react";
import { appRouter } from "~/trpc/router";
import { Button, Space } from "antd";

export const action: ActionFunction = async ({ request }: ActionFunctionArgs) => {
  const body = await request.formData();
  const caller = appRouter.createCaller({})
  const d = {
    email: body.get('email') as string,
    password: body.get('password') as string,
    profile: {
      bio: body.get('bio') as string
    }
  }
  const data = await caller.users.create(d)
  return json({ users: data })
}

export const loader = async () => {
  const caller = appRouter.createCaller({})
  const data = await caller.users.get()
  return json({ users: data })
}

export default function UserRoute() {
  const data = useLoaderData<typeof loader>()
  const fetcher = useFetcher()
  return <PageContainer>
    <ProCard>
      <ProTable
        dataSource={data.users}
        toolBarRender={() => [
          <Button key="new" onClick={() => {
            const p = new Date().getTime().toString()
            const d = {
              email: 'x@d' + p + '.com',
              name: 'name' + p,
              password: 'p' + p,
              bio: 'http://www.234.com' + 'bio' + p,
            }
            fetcher.submit(d, {
              method: 'POST'
            })
          }}>新增</Button>
        ]}
        columns={[
          {
            dataIndex: 'name',
            title: '名字'
          },
          {
            dataIndex: 'email',
            title: '邮箱'
          },
          {
            dataIndex: 'op',
            title: '操作',
            render(record) {
              return <Space>
                <Button>编辑</Button>
                <Button>删除</Button>
              </Space>
            }
          },
        ]}
      />
    </ProCard>
  </PageContainer>
}

/**
 * 1. 打通数据库和起前端
 * 2. 数据库列表
 */
