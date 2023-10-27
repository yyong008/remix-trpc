import { PageContainer, ProCard, ProTable } from "@ant-design/pro-components";
import {
  type ActionFunction,
  type ActionFunctionArgs,
  json,
} from "@remix-run/node";
import { useActionData, useFetcher, useLoaderData } from "@remix-run/react";
import { appRouter } from "~/trpc/router";
import { Button, Space, message } from "antd";
import { client } from "~/trpc/client";
import UserModel from "~/components/UserModel";
import UserUpdateModel from "~/components/UserUpdateModel";
import { useEffect, useRef } from "react";

export const action: ActionFunction = async ({
  request,
}: ActionFunctionArgs) => {
  const body = await request.formData();
  const method = request.method;

  const caller = appRouter.createCaller({});
  const name = body.get("name") as string;
  const email = body.get("email") as string;
  const password = body.get("password") as string;
  const bio = body.get("bio") as string;
  const d = {
    name,
    email,
    password,
    profile: {
      bio,
    },
  };

  if (method === "POST") {
    const data = await caller.users.create(d);
    return json({ users: data });
  } else if (method === "PUT") {
    const id = body.get("id") as number;
    const data = await caller.users.update({ id: +id, data: d });
    return json({ users: data });
  } else if (method === "DELETE") {
    const id = body.get("id") as number;
    const data = await caller.users.del(+id);
    return json({ users: data });
  }

  return null;
};

export const loader = async () => {
  const caller = appRouter.createCaller({});
  const data = await caller.users.get();
  return json({ users: data });
};

export default function UserRoute() {
  const fetcher = useFetcher();
  const formRef = useRef();

  useEffect(() => {
    if (fetcher.state === "submitting") {
      message.info("正在提交");
    }
    if (fetcher.state === "loading") {
      message.info("操作成功");
      formRef.current?.reload();
    }
  }, [fetcher.state]);
  return (
    <PageContainer>
      <ProCard>
        <ProTable
          search={false}
          actionRef={formRef}
          request={async (params) => {
            const take = params.pageSize ?? 20;
            const skip = ((params.current || 1) - 1) * take;
            const { data, total } = await client.users.getPage.query({
              skip,
              take,
            });

            return {
              data,
              total,
              success: true,
            };
          }}
          toolBarRender={() => [
            <UserModel
              key="create"
              submit={(value) => {
                const p = new Date().getTime().toString();
                const d = {
                  email: value.email + "x@d" + p + ".com",
                  name: value.name + "name" + p,
                  password: value.password + "p" + p,
                  bio: value.bio + "http://www.234.com" + "bio" + p,
                };
                fetcher.submit(d, {
                  method: "POST",
                });
              }}
            />,
          ]}
          columns={[
            {
              dataIndex: "id",
              title: "id",
            },
            {
              dataIndex: "name",
              title: "名字",
            },
            {
              dataIndex: "email",
              title: "邮箱",
            },
            {
              dataIndex: "profile.bio",
              title: "bio",
              render(_, record) {
                return <a href={record.profile.bio}>{record.profile.bio}</a>;
              },
            },
            {
              dataIndex: "op",
              title: "操作",
              render(_, record) {
                return (
                  <Space>
                    <UserUpdateModel
                      record={record}
                      submit={(value) => {
                        fetcher.submit(
                          {
                            id: record.id,
                            ...value,
                          },
                          {
                            method: "PUT",
                          }
                        );
                      }}
                    />
                    <Button
                      onClick={() => {
                        fetcher.submit(
                          {
                            id: record.id,
                          },
                          {
                            method: "DELETE",
                          }
                        );
                      }}
                    >
                      删除
                    </Button>
                  </Space>
                );
              },
            },
          ]}
        />
      </ProCard>
    </PageContainer>
  );
}

/**
 * 1. 打通数据库和起前端
 * 2. 数据库列表
 */
