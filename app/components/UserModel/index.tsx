import * as _icons from "@ant-design/icons";
import { ModalForm, ProFormText } from "@ant-design/pro-components";
import { Button, Form, message } from "antd";

const { PlusOutlined } = _icons;

export default function UserModel(props) {
  const [form] = Form.useForm<{ name: string; company: string }>();
  return (
    <ModalForm<{
      name: string;
      company: string;
    }>
      title="新建表单"
      trigger={
        props.trigger ? (
          props.trigger
        ) : (
          <Button type="primary">
            <PlusOutlined />
            新建用户
          </Button>
        )
      }
      form={form}
      autoFocusFirstInput
      modalProps={{
        destroyOnClose: true,
        onCancel: () => console.log("run"),
      }}
      submitTimeout={2000}
      onFinish={async (values) => {
        props.submit(values);
        return true;
      }}
    >
      <ProFormText
        // width="md"
        name="name"
        label="输入名字"
        tooltip="最长为 24 位"
        placeholder="请输入名称"
      />
      <ProFormText
        // width="md"
        name="email"
        label="输入邮箱"
        tooltip="最长为 24 位"
        placeholder="请输入名称"
      />
      <ProFormText
        // width="md"
        name="password"
        label="输入密码"
        tooltip="最长为 24 位"
        placeholder="请输入名称"
      />
      <ProFormText
        // width="md"
        name="bio"
        label="输入 bio 地址"
        tooltip="最长为 24 位"
        placeholder="请输入名称"
      />
    </ModalForm>
  );
}
