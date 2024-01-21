import React, { useState, useEffect } from "react";
import { Dropdown } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { adminLogOut } from "../../state/actions/admin_login";
import { LayoutDashboard, Boxes, Package } from "lucide-react";

export default function Sidebar(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selected, setSelected] = useState("Home");

  const items = [
    {
      icon: <LayoutDashboard />,
      text: "Home",
    },
    {
      icon: <Boxes />,
      text: "Products",
    },
    {
      icon: <Package />,
      text: "Orders",
    },
  ];

  useEffect(() => {
    props.selectedComponent(selected);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  return (
    <div>
      <div>
        <div className="absolute flex h-screen bg-gray-100">
          <div className="w-64 border-r shadow-lg rounded-r-lg">
            <h6 className="text-center p-4 border-b">Kayra Creation Admin</h6>

            <ul>
              {items.map((item, key) => (
                <li
                  key={key}
                  className={`
          relative flex items-center py-2 px-3 gap-4 my-1
          cursor-pointer group
          text-[18px] font-normal
          ${
            selected.toLowerCase() === item.text.toLowerCase()
              ? " text-gray-800"
              : "hover:text-gray-400 text-gray-300"
          }
      `}
                  onClick={() => setSelected(item.text)}
                >
                  {item.icon}
                  <span className={`overflow-hidden transition-all`}>
                    {item.text}
                  </span>
                </li>
              ))}
            </ul>
            <div className="border-t flex p-3 justify-center items-center">
              <img
                src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
                alt=""
                className="w-8 h-8 rounded-md"
              />
              <div
                className={`
                flex justify-between items-center
                overflow-hidden transition-all ml-3 w-52
            `}
              >
                <div className="leading-4">
                  <h6 title={props.admin.name} className="font-semibold">
                    {props.admin.name}
                  </h6>
                  <span className="text-xs text-gray-600">
                    {props.admin.username}
                  </span>
                </div>
              </div>
              <div className="flex justify-center items-center">
                <Dropdown>
                  <Dropdown.Toggle
                    variant="success"
                    id="dropdown-basic"
                  ></Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item href="/admin/account/settings">
                      Settings
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => {
                        dispatch(adminLogOut());
                        navigate("/Admin/Account/Login");
                      }}
                    >
                      Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
