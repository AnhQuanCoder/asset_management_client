import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import React from "react";

type TProps = App.Layouts.Header.IProps;

const HeaderComponent = (props: TProps) => {
  const { collapsed, setCollapsed } = props;

  const handleClickCollapse = React.useCallback(() => {
    setCollapsed(!collapsed)
  }, [collapsed]);

  return (
    <>
      <header className="bg-white flex justify-between items-center px-[10px] h-[65px] border-b border-b-[#edf2f9]">
        <div className="flex items-center gap-4">
          <div
            className="w-[48px] h-[38px] flex items-center justify-center hover:bg-[#3f87f51a] cursor-pointer"
            onClick={handleClickCollapse}
          >
            {collapsed ?
              <MenuUnfoldOutlined className="w-[18px] h-[18px] text-[18px] hover:!text-[#3f87f5]" />
              :
              <MenuFoldOutlined className="w-[18px] h-[18px] text-[18px] hover:!text-[#3f87f5]" />
            }

          </div>
        </div>
      </header>
    </>
  )
}

export default React.memo(HeaderComponent);