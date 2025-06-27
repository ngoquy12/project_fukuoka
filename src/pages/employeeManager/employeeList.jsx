import { Button, Input, Table, Space, Tag, Pagination, Dropdown } from "antd";
import {
  EllipsisVertical,
  Eye,
  Filter,
  Search,
  SquarePen,
  Trash2,
} from "lucide-react";

export default function EmployeeList() {
  const items = [
    {
      label: (
        <div className="text-[#3877DD] font-medium text-[16px] flex items-center gap-1 px-2 py-1">
          <SquarePen size={20} />
          <span>Chỉnh sửa</span>
        </div>
      ),
      key: "edit",
    },
    {
      label: (
        <div className="text-[#B82722] font-medium text-[16px] flex items-center gap-1 px-2 py-1">
          <Trash2 size={20} />
          <span>Xóa</span>
        </div>
      ),
      key: "delete",
    },
    {
      label: (
        <div className="text-[#777777] font-medium text-[16px] flex items-center gap-1 px-2 py-1">
          <Eye size={20} />
          <span>Xem chi tiết</span>
        </div>
      ),
      key: "view-detail",
    },
  ];

  const columns = [
    {
      title: "Nhân viên",
      key: "employee",
      render: (_, employee) => (
        <div className="flex items-center gap-1">
          <img
            className="rounded-full"
            height={32}
            width={32}
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2FoNFztYrjisKytpNypxcpYf_tQqGme8q5Q&s"
            alt=""
          />
          <div className="flex flex-col">
            <span className="text-[16px] font-medium">Cao Hà Anh</span>
            <span className="text-[14px] font-normal text-[#979797]">
              NV001
            </span>
          </div>
        </div>
      ),
    },
    {
      title: "Giới tính",
      dataIndex: "gender",
      key: "gender",
      render: (gender = 1) => <span>{gender === 1 ? "Nam" : "Nữ"}</span>,
    },
    {
      title: "Ngày sinh",
      dataIndex: "dateOfBirth",
      key: "dateOfBirth",
      render: (date) => <span>20/11/2025</span>,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: () => (
        <div className="bg-[#BCEFA2] rounded-[16px] px-2 py-[2px] flex items-center gap-2 w-fit">
          <div className="size-[6px] rounded-full bg-[#3F9C12]"></div>
          <span className="text-[#3F9C12] font-normal">Đang hoạt động</span>
        </div>
      ),
    },
    {
      title: "Số điện thoại",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      render: () => <span>0898787651</span>,
    },
    {
      title: "Vị trí làm việc",
      dataIndex: "position",
      key: "position",
      render: () => <span>Giám đốc</span>,
    },

    {
      title: <div className="text-center">Chức năng</div>,
      key: "action",
      render: (_, record) => (
        <div className="flex justify-center">
          <Dropdown arrow={true} menu={{ items }} trigger={["click"]}>
            <EllipsisVertical className="text-[#777777] cursor-pointer" />
          </Dropdown>
        </div>
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
