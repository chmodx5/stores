import React from "react";
import { Dialog } from "@headlessui/react";
import IconButton from "../IconButton/IconButton";
import { FaRegEdit, FaTimes } from "react-icons/fa";

const EditModal = ({ children, modalContent }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <div>
      <div className="relative inline-block">
        <div className="inline-block absolute -top-5 -right-10">
          <IconButton
            onClick={() => setIsOpen(!isOpen)}
            className={"text-white"}
          >
            <FaRegEdit className="text-white" />
          </IconButton>
        </div>
        <div className=" ">{children}</div>
      </div>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className={"relative z-50"}
      >
        <div className="fixed bg-black bg-opacity-30 inset-0 flex items-center justify-center">
          <Dialog.Panel className={"bg-white  w-3/4 rounded-lg p-4 "}>
            <Dialog.Title className={"flex justify-between items-center"}>
              <div>
                <h1 className="font-semibold  text-xl">Edit account</h1>
              </div>
              <IconButton
                onClick={() => setIsOpen(false)}
                className={"text-white"}
              >
                <FaTimes className="text-white" />
              </IconButton>
            </Dialog.Title>

            <div>{modalContent}</div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

export default EditModal;
