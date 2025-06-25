import { Button, Input, Table, Space, Tag, Pagination } from "antd";
import { Filter, Search } from "lucide-react";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Tags",
    key: "tags",
    dataIndex: "tags",
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? "geekblue" : "green";
          if (tag === "loser") {
            color = "volcano";
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];
const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ["loser"],
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sydney No. 1 Lake Park",
    tags: ["cool", "teacher"],
  },
];

export default function EmployeeList() {
  return (
    <>
      {/* Phần chức năng */}
      <div className="flex items-center justify-between">
        <h3 className="text-[24px] text-[#272727] font-bold">
          Danh sách nhân viên
        </h3>

        <div className="flex items-center gap-3 mb-5">
          <Button className="h-[42px] font-semibold">Nhập dữ liệu</Button>
          <Button className="h-[42px] font-semibold">Xuất dữ liệu</Button>
          <Button className="h-[42px] font-semibold" type="primary">
            Thêm nhân viên
          </Button>
        </div>
      </div>

      {/* Tìm kiếm và lọc dữ liệu */}
      <div className="flex items-center justify-between mb-5">
        <Button className="h-[42px] font-semibold rounded-full flex items-center gap-3">
          <Filter size={16} />
          Lọc
        </Button>
        <Input
          placeholder="Tìm kiếm theo tên, số điện thoại"
          className="w-[298px] h-[42px]"
          prefix={<Search size={18} />}
        />
      </div>

      {/* Table danh sách nhân viên */}
      <div className="mb-5">
        <Table columns={columns} dataSource={data} pagination={false} />
      </div>

      {/* Phân trang danh sách nhân viên */}
      <div className="flex justify-end">
        <Pagination
          total={85}
          showTotal={(total) => `Tổng số bản ghi: ${total}`}
          defaultPageSize={20}
          defaultCurrent={1}
        />
      </div>
    </>
  );
}
