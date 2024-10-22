import React, { useState } from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
import { Calendar as CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { getTimeScalesByProj } from "@/functions/services/charts";
import { MdDeleteOutline } from "react-icons/md";
import { HiOutlinePencil } from "react-icons/hi";
import { Input } from "@/components/ui/input";
import { IoMdClose } from "react-icons/io";
import { SiSpinnaker } from "react-icons/si";
import { ClipLoader } from "react-spinners";
// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)

function ModalObj({
  id,
  data,
  isLoading,
}: {
  id: string;
  isLoading: boolean;
  data: any;
}) {
  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [openPopover, setOpenPopover] = useState(false);
  //   const { mutate, isPending: isPendingM } = useMutation<any>({
  //     mutationFn: createTimeScalesByProj,
  //     onSuccess: () => toast.success("انجام شد"),
  //   });
  return (
    <div>
      <div onClick={openModal}>
        <HiOutlinePencil className=" cursor-pointer z-50 top-2 w-6 h-6 px-0 py-1 rounded-full bg-primary text-white shadow-md" />
      </div>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div>
          <Button
            variant="ghost"
            className="m-1"
            onClick={() => setIsOpen(false)}
          >
            <IoMdClose />
          </Button>
        </div>
        <div className="flex gap-2 flex-col" dir="rtl">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[280px] justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
                onClick={() => {
                  setOpenPopover((x) => !x);
                }}
              >
                <CalendarIcon />
                {date ? format(date, "PPP") : <span>انتخاب زمان </span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto p-0 z-50"
              onClick={(event) => event.stopPropagation()}
            >
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <Input placeholder="ورودی اول"></Input>
          <Input placeholder="ورودی دوم"></Input>
          <div className="space-y-4">
            <div className=" h-42 overflow-auto border rounded-sm">
              {isLoading ? (
                <div className="flex justify-center m-5">
                  <ClipLoader></ClipLoader>
                </div>
              ) : (
                data.map((ele) => {
                  const date = new Date(ele.date);
                  return (
                    <div className=" p-2  border-b flex justify-between content-center items-center">
                      <div>
                        {`${date.getUTCFullYear()}/${date.getUTCMonth()}/${date.getUTCDay()}`}
                      </div>
                      <div>
                        <Button className="  rounded-full">
                          <MdDeleteOutline size={20}></MdDeleteOutline>
                        </Button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default ModalObj;
