import { Dropdown, Input, Space, Tooltip } from "antd";
import {
  AlignJustify,
  Bell,
  ChevronDown,
  Key,
  Power,
  Search,
  Settings,
  UserRound,
} from "lucide-react";
import React from "react";

export default function HeaderComponent() {
  const items = [
    {
      label: (
        <div className="flex items-center gap-2 px-2 py-1">
          <img src="/flag-vietnam.png" alt="" />
          <span>Việt Nam</span>
        </div>
      ),
      key: "0",
    },
    {
      label: (
        <div className="flex items-center gap-2 px-2 py-1">
          <img height={24} width={24} src="/flag-uk.png" alt="" />
          <span>English</span>
        </div>
      ),
      key: "1",
    },
  ];

  const profileOptions = [
    {
      label: (
        <div className="flex items-center gap-2 px-2 py-1">
          <UserRound size={20} />
          <span>Thông tin cá nhân</span>
        </div>
      ),
      key: "profile",
    },
    {
      label: (
        <div className="flex items-center gap-2 px-2 py-1">
          <Key size={20} />
          <span>Đổi mật khẩu</span>
        </div>
      ),
      key: "change-password",
    },
    {
      label: (
        <div className="flex items-center gap-2 px-2 py-1">
          <Settings size={20} />
          <span>Cài đặt</span>
        </div>
      ),
      key: "change-password",
    },
    {
      type: "divider",
    },
    {
      label: (
        <div className="flex items-center gap-2 px-2 py-1">
          <Power size={20} />
          <span>Đăng xuất</span>
        </div>
      ),
      key: "logout",
    },
  ];
  return (
    <>
      <header className="h-[120px] bg-[#FAFAFA] px-[52px] flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Tooltip title="Đóng lại">
            <div className="size-10 hover:bg-gray-300 flex items-center justify-center rounded-full p-2 cursor-pointer transition-all">
              <AlignJustify size={18} />
            </div>
          </Tooltip>
          <Input
            placeholder="Tìm kiếm ..."
            className="h-12 w-[579px]"
            prefix={<Search size={18} />}
          />
        </div>
        <div className="flex items-center gap-5">
          <Dropdown menu={{ items: items }} trigger={["click"]}>
            <div className="flex items-center gap-1 cursor-pointer hover:opacity-80">
              <img src="/flag-vietnam.png" alt="" />
              <span className="text-[16px] font-semibold">VN</span>
              <ChevronDown />
            </div>
          </Dropdown>
          <div className="relative">
            <Bell />
            <div className="size-2 bg-[#FF0041] rounded-full absolute right-0 top-0"></div>
          </div>

          <Dropdown menu={{ items: profileOptions }} trigger={["click"]}>
            <div className="flex items-center gap-2 cursor-pointer hover:opacity-80">
              <img height={48} width={48} src="/avatar-default.png" alt="" />
              <div>
                <span className="text-[#272727] text-[16px] font-semibold">
                  Cody Fisher
                </span>
                <p className="text-[#595959] text-[12px]">Chủ cửa hàng</p>
              </div>
              <ChevronDown />
            </div>
          </Dropdown>
        </div>
      </header>
    </>
  );
}
